# Motia: Code-First Framework for Intelligent Workflows and Agentic Systems

[![Motia on GitHub](https://img.shields.io/github/stars/MotiaDev/motia?style=social)](https://github.com/MotiaDev/motia) [![Join our Discord](https://img.shields.io/discord/1322278831184281721?label=Discord&logo=discord&logoColor=white)](https://discord.gg/beBTWeMZ)

**Unleash the power of event-driven workflows and intelligent agents with Motia – the code-first framework designed for developers.**

Motia simplifies the creation, testing, and deployment of robust, scalable, and observable automations and agentic systems. Forget wrestling with complex infrastructure and focus on what truly matters: **your business logic.**

## Why Choose Motia?

Motia is built for developers who want to build **intelligent, event-driven systems rapidly and reliably.** Here's what makes Motia the ideal choice:

*   **🚀 Zero Infrastructure Hassle:** Say goodbye to message queues, brokers, and complex configurations. Motia handles the underlying infrastructure, letting you concentrate on building your workflows, not managing plumbing. Get started in minutes, not days.

*   **💻 Code-First Approach:** Define your workflows and agent logic using code, providing you with full control, versioning, and familiar development workflows. Motia embraces code-first principles for maximum flexibility and developer empowerment.

*   **🧩 Modular & Reusable Steps:** Build your workflows from reusable, self-contained steps. This modular architecture promotes code organization, maintainability, and allows you to easily compose complex workflows from smaller, manageable units.

*   **🌐 Choose Your Language: JavaScript, TypeScript, Python, & Ruby:** Develop your steps in the languages you and your team are most comfortable with. Motia supports JavaScript, TypeScript, Python, and Ruby, allowing you to leverage existing skills and codebases.

*   **📦 Import Any Dependency:**  Seamlessly integrate external libraries and packages within your steps.  Whether it's npm, pip, or RubyGems, you can leverage the rich ecosystems of each language to power your workflow logic and agent capabilities.

*   **🔀 Mix & Match Languages in a Single Flow:**  Achieve ultimate flexibility by combining steps written in different languages within the same workflow. Leverage the strengths of each language and create truly polyglot automation solutions.

*   **🧠 Ideal for Intelligent Agents & Workflows:** Motia's event-driven architecture and modular steps are perfectly suited for building sophisticated agents and intelligent automations.  Whether you're creating GenAI-powered workflows, complex decision-making systems, or data processing pipelines, Motia provides the ideal foundation.

    *   **Create Agent Components as Steps:**  Encapsulate agent logic, tool integrations, and decision-making processes within individual steps, leveraging the rich ecosystems of JavaScript, Python, and Ruby.
    *   **Orchestrate Agent Interactions with Flows:**  Design complex agentic workflows by connecting steps to create sophisticated sequences of actions and reactions, easily integrating steps written in different languages.
    *   **Test and Evaluate Agent Behavior Visually:**  The Motia Workbench provides real-time visualization and testing tools to observe and refine your agents' behavior and ensure they perform as expected, regardless of the underlying step language.
    *   **Iterate and Evolve Agents Rapidly:** Motia's modularity and observability make it easy to iterate on agent logic, experiment with different approaches, and continuously improve your intelligent systems, taking advantage of the strengths of each supported language.

*   **📊 Built-in Observability & Debugging:**  Gain deep insights into your workflows with the **Motia Workbench**. Visualize your flows, stream live logs, and test steps in real-time. Debugging complex event-driven systems has never been easier, even with workflows combining multiple languages.

*   **⚡️ Instant APIs & Scheduling:** Expose your workflows as HTTP endpoints with API Steps or schedule tasks with Cron Steps – all out-of-the-box. No extra configuration needed to make your workflows accessible and automated, regardless of the step implementation language.

*   **🧪 Streamlined Testing & Evaluation:** Motia provides built-in testing utilities and the Workbench to thoroughly test your steps and flows.  Evaluate agent behavior, ensure workflow reliability, and catch issues early in development.  The visual testing in the Workbench is invaluable for understanding complex agent interactions, even across polyglot workflows.

*   **✨ Extensible & Customizable:** Motia is designed to be flexible. Create custom UI components for your steps in the Workbench, build custom state adapters, and extend the framework to meet your specific needs, leveraging your preferred language for each extension point.

*   **🧑‍💻 Developer-First Experience:**  From the intuitive CLI and code-first approach to the powerful Workbench and comprehensive documentation, Motia is built to maximize developer productivity and make building complex systems enjoyable, no matter your language preference.

## Motia Workbench: Your Visual Control Center

The Motia Workbench is your browser-based development environment. It's where you'll bring your workflows to life:

![Motia Workbench Interface](./assets/workbench-example.png)

*   **Interactive Flow Visualization:** See your steps connected in a dynamic, visual graph. Understand event flow and step interactions at a glance.
*   **Real-time Testing:** Trigger API endpoints and emit events directly from the UI to test your flows and agents in real-time.
*   **Live Log Streaming:**  Monitor logs in real-time within the Workbench, making debugging and observing execution a breeze.
*   **Step Customization:**  Create custom UI components for your steps to enhance visualization and tailor the Workbench to your workflows.

## Quick Start

Ready to get started in minutes? Follow these simple steps using **pnpm** and the automated project creation:

1.  **Create a new project using the Motia CLI:**

    ```bash
    npx motia create -t default -n my-motia-project
    ```
    *(Replace `my-motia-project` with your desired project name)*

    This command will:
    * Create a new folder `my-motia-project`
    * Set up a basic Motia project with example steps
    * Install dependencies using pnpm

2.  **Navigate into your new project directory:**

    ```bash
    cd my-motia-project
    ```

3.  **Start the Motia development server:**

    ```bash
    pnpm run dev
    ```

    This will launch the Motia server and the Workbench UI (typically at `http://localhost:3000`).

4.  **Open the Motia Workbench in your browser (usually `http://localhost:3000`)**. You should see a pre-built flow named "default" with example steps visualized.

5.  **Test an example API Step:** In your terminal, use `curl` to trigger the example API endpoint (often `/default` in the default template):

    ```bash
    curl -X POST http://localhost:3000/default \
    -H "Content-Type: application/json" \
    -d '{}'
    ```

    Alternatively, use the Motia CLI to emit an event (for event-based steps in the template):

    ```bash
    npx motia emit --topic test-state --message '{}'
    ```

    Check the Workbench logs – you should see logs indicating the step execution and event flow!

**Congratulations! You've just created and run your first Motia workflow using the automated project setup.**

## Next Steps

*   **Dive into the Documentation:** Explore the [full Motia documentation](https://motia.dev/docs) to understand core concepts, step types, state management, and more.
*   **Explore Examples:** Check out practical [examples](https://motia.dev/docs/real-world-use-cases) to see Motia in action and get inspiration for your own workflows and agents.
*   **Join the Community:** Connect with other Motia users and the development team on our [Discord server](https://discord.gg/sXbs97D8) and contribute to the project on [GitHub](https://github.com/MotiaDev/motia).

## We're excited to see what you build with Motia!

---

**License:** [MIT](LICENSE)
