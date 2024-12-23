import { test, expect } from "@playwright/test";
import fetch from "node-fetch";
import Redis from "ioredis";

test.describe("Hybrid Workflow E2E", () => {
  let redisSubscriber;
  let collectedEvents = [];

  const subscribeToEvents = async () => {
    redisSubscriber = new Redis({ host: "127.0.0.1", port: 6379 });
    redisSubscriber.psubscribe("motia:events:*");

    redisSubscriber.on("pmessage", (_, channel, message) => {
      const eventType = channel.replace("motia:events:", "");
      const event = JSON.parse(message);
      collectedEvents.push({ eventType, ...event });
    });
  };

  test.beforeEach(async () => {
    collectedEvents = [];
    await subscribeToEvents();
  });

  test.afterAll(async () => {
    await redisSubscriber?.quit();
  });

  test("processes hybrid workflow through all stages", async () => {
    // Test input data
    const testData = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
    ];

    // Send the request to start the hybrid workflow
    const res = await fetch("http://localhost:4000/api/hybrid/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: testData }),
    });

    expect(res.status).toBe(200);

    // Wait for the workflow to complete
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust time as needed

    // Define the expected sequence of events
    const expectedEventSequence = [
      "hybrid.received",
      "hybrid.validated",
      "hybrid.transformed",
      "hybrid.enriched",
      "hybrid.analyzed",
      "hybrid.completed",
    ];

    // Extract event types from collected events
    const emittedEventTypes = collectedEvents.map((e) => e.eventType);
    expect(emittedEventTypes).toEqual(
      expect.arrayContaining(expectedEventSequence)
    );

    // Validate intermediate events
    const validatedEvent = collectedEvents.find(
      (e) => e.eventType === "hybrid.validated"
    );
    expect(validatedEvent).toBeDefined();
    expect(validatedEvent.data.items).toEqual(testData);

    const transformedEvent = collectedEvents.find(
      (e) => e.eventType === "hybrid.transformed"
    );
    expect(transformedEvent).toBeDefined();
    expect(transformedEvent.data.items).toEqual([
      { id: 1, value: 20, transformed_by: "python" },
      { id: 2, value: 40, transformed_by: "python" },
    ]);

    const enrichedEvent = collectedEvents.find(
      (e) => e.eventType === "hybrid.enriched"
    );
    expect(enrichedEvent).toBeDefined();
    expect(enrichedEvent.data.items).toEqual([
      {
        id: 1,
        value: 20,
        transformed_by: "python",
        enriched_by: "node",
        processed_at: expect.any(String),
      },
      {
        id: 2,
        value: 40,
        transformed_by: "python",
        enriched_by: "node",
        processed_at: expect.any(String),
      },
    ]);

    // Validate the final "completed" event
    const completedEvent = collectedEvents.find(
      (e) => e.eventType === "hybrid.completed"
    );
    expect(completedEvent).toBeDefined();
    expect(completedEvent.data.summary).toEqual({
      itemCount: 2,
      statistics: {
        total: 60,
        average: 30,
        count: 2,
        analyzed_by: "python",
      },
      startTime: expect.any(String),
      endTime: expect.any(String),
    });
  });
});
