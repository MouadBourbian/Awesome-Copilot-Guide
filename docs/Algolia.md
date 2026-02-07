# Algolia Configuration

This guide details how to generate the search index, import data into Algolia, and configure the Agent.

## 1. Data Generation

The project includes a Python script to fetch and format the data source.

**Script Source**: [algolia_generate_index.py](../scripts/algolia_generate_index.py)

### Usage

Run the script to generate the JSON index file:

```bash
python ../scripts/algolia_generate_index.py
```

This will:

1. Fetch the `llms.txt` content from `github.github.io`.
2. Parse the markdown content.
3. Output a structured file named `awesome-copilot.json`.

## 2. Indexing

Once the `awesome-copilot.json` file is generated, import it into your Algolia application.

1. Navigate to the **Algolia Dashboard**.
2. Go to **Search** > **Index**.
3. Create a new index or select an existing one.
4. Select **Upload records** and upload the `awesome-copilot.json` file.

**Documentation**: [Importing from the dashboard](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-from-the-dashboard)

## 3. Configuration

### Faceting

To enable efficient filtering, configure the `type` attribute as a facet in your index settings.

1. Go to **Configuration** > **Facets**.
2. Add `type` to the list of attributes for faceting.
3. Set it to **filter only**.
4. Save the changes.

**Documentation**: [Configuring faceting](https://www.algolia.com/ecommerce-merchandising-playbook/configuring-faceting)

## 4. Agent Setup

This application connects to an Algolia Agent.

1. Create an agent in **Algolia Agent Studio**.
2. Create an **instruction** for the agent. See the [Agent Instructions](../prompts/algolia-instructions.md) for the used prompt.
3. Connect the agent to the index created in step 2.
4. Add the following **description** for the **index**: "A catalog of GitHub Copilot agents, skills, instructions, prompts, and documentation for developers. Must be searched before any recommendation. This is the sole source of truth for all suggestions."
5. Add an AI provider (e.g., Google Gemini) to the agent.
6. Publish the agent and copy the given credentials to the `.env.local` file as described in the [README](../README.md#environment-variables).
