---
sidebar_label: Image Search
sidebar_position: 1
---
import ImageSearchVideo from './img/image-search/Image_Search.mp4'
import LabButtons from './components/LabButtons'


# Sage Image Search

<LabButtons id="image-search" />

In the age of AI-powered tools, searching through thousands of images shouldn't just be about basic metadata. What if you could search by meaning? That’s exactly what this project aims to do: combine the best of **semantic understanding** and **keyword precision** into one powerful **hybrid image search engine** to help you find relevant image series for your project.

<video className="w-full h-auto" controls>
  <source src={ImageSearchVideo} type="video/mp4" />
</video>

> All images in this demo were captured by Sage nodes and retrieved from Beehive in near real-time.

Let’s walk through what it does, how it works, and where it’s going next.

## What We're Building

This project is all about **hybrid search** — combining **vector-based** and **keyword-based** search — to enable smarter image retrieval. At its core, the **production** system:

* **Generates captions** for each image using a **vision-language model ([Gemma 4](https://nrp.ai/documentation/userdocs/ai/llm-managed/models/#gemma))** — a detailed long caption, a short caption, and keywords
* **Creates CLIP embeddings** with **[DFN5B-CLIP-ViT-H-14-378](https://huggingface.co/apple/DFN5B-CLIP-ViT-H-14-378)** — a separate vector for the image and for the short caption + keywords
* **Stores embeddings and metadata** in **[NRP](https://nrp.ai/)-managed [Milvus](https://milvus.io)**
* Performs **vector search** against both image and caption embeddings
* Also does a traditional **keyword search** (BM25) on captions and SAGE metadata
* **Combines the results** with a three-way weighted hybrid ranker
* Finally, **reranks** the top hits with **CLIP** (query text vs. the image)

Why all this? Because combining these techniques helps you go beyond surface-level matching — it helps find the *right* image even if the words in the query aren’t an exact match to the caption.

> **Note:** Individual components (captioning models, embedding models, rerankers, and so on) are interchangeable — the deployed system may use updated versions of those listed above, but the **pipeline** stays the same. For the latest models and services in use, see the [Github Repository](https://github.com/waggle-sensor/sage-nrp-image-search).

## The Tech Stack & Pipeline

Here’s how the production stack fits together:

### Step 1: Captioning with a vision-language model

We start with raw images from SAGE cameras. A VLM writes a **long caption** (rich description for keyword search), a **short caption** (visible content only), and keywords. Production uses **Gemma 4** on the [NRP](https://nrp.ai/) AI Gateway. The teaching lab uses smaller [Florence-2-base](https://huggingface.co/microsoft/Florence-2-base) so it runs on a classroom GPU.

For example, an image of a storm in Chicago might be captioned as:

> *"A wet intersection of cars with a sky filled with dark clouds."*

### Step 2: Embedding with CLIP

We then use **[CLIP](https://huggingface.co/apple/DFN5B-CLIP-ViT-H-14-378)** to generate vector representations for the **image** and for **short caption + keywords** (CLIP’s text window is 77 tokens). These live in the **same vector space**, so a natural-language query can be compared to both pixels and words. Production stores the two modalities as separate Milvus fields and blends them at query time.

### Step 3: Vector + Keyword Search

At query time, we do two types of search:

* **Vector Search:** The user’s query is embedded with CLIP, and we search the most similar `image_vector` and `caption_vector` records.
* **Keyword Search:** The query is also run as a traditional text search against captions and metadata using **BM25**.

Each method has its strengths. Vector search understands *meaning*, while keyword search catches *literal matches* such as node IDs (`vsn`) and camera names.

### Step 4: Hybrid Search Fusion

We merge image, caption, and BM25 results with Milvus `hybrid_search` and a **WeightedRanker** (roughly 46% image / 20% caption / 35% BM25). This hybrid strategy balances **semantic relevance** from vector search with the **precision** of keyword matching.

### Step 5: Reranking with CLIP

Production then re-scores the top hits with **[CLIP](https://huggingface.co/apple/DFN5B-CLIP-ViT-H-14-378)**: how well the query text matches each *image*, not just the caption. That is the finishing touch that boosts the most relevant images to the top. The Jupyter lab teaches the same idea with a classic CrossEncoder on query–caption pairs.

## Hands-on Lab

This lab was built for [Sage Grande: Summer of AI](/docs/events/2026-Sage-Summer-Hackathon) and is the best way to walk the pipeline yourself.

**Launch the workspace on the National Data Platform:**

[Sage Image Search Lab Workspace](https://nationaldataplatform.org/workspaces/99ea4ec4-91b5-4f6d-890a-5173afd14312)

From there, open [sage_image_search_lab.ipynb](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/notebooks/sage_image_search_lab.ipynb). Full NDP setup (GPU reservation, persistent storage, install steps) is in [learning.md](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/learning.md).

The notebook walks through:

1. SageBench subset
2. Captioning
3. CLIP embeddings
4. Indexing in Milvus Lite
5. Vector search, then keyword search
6. Hybrid search
7. Reranking
8. A Gradio search UI
9. Mini evaluation (MRR and Success@K)

Companion videos: [Sage Image Search overview](https://youtu.be/hzfKL0smzFM) and [Image Search Benchmarking](https://youtu.be/NUEs7AeGk4I).

## Why This Matters

As our object database continues to grow, the challenge of finding the right image at the right moment becomes increasingly difficult. With thousands of visuals available, building rich datasets with Sage is possible — but navigating that volume can be frustrating and time-consuming. Traditional search methods in our cyberinfrastructure are starting to show their limits. **Time-based filtering** assumes users already know when the relevant images were captured, while **metadata filtering** often forces them to sift through large volumes manually to find what they need. That’s where this **hybrid approach** makes a real difference — by combining the **semantic power of vector search** with the **precision of keyword matching**, users can efficiently locate the exact image they’re looking for — and pinpoint the precise moment it was captured.

If you’re working on something similar or curious to dive deeper, feel free to reach out.

Try the live UI at [portal.sagecontinuum.org/labs/image-search](https://portal.sagecontinuum.org/labs/image-search).

## Publication

This work was presented at [USRSE'25](https://us-rse.org/usrse25). For a high-level overview of the system architecture and motivation, see the [official poster](https://doi.org/10.5281/zenodo.17237284): *Searching Sage: AI-Powered Image Retrieval on a Nationwide Edge Computing Cyberinfrastructure*.

## Resources

Everything you need to try the system, run the hands-on lab, and cite the work lives here:

| Resource | Link |
|----------|------|
| **Try the live search** | [portal.sagecontinuum.org/labs/image-search](https://portal.sagecontinuum.org/labs/image-search) |
| **Source code** | [waggle-sensor/sage-nrp-image-search](https://github.com/waggle-sensor/sage-nrp-image-search) |
| **National Research Platform** | [nrp.ai](https://nrp.ai/) |
| **Run the lab on NDP** | [Image Search Lab workspace](https://nationaldataplatform.org/workspaces/99ea4ec4-91b5-4f6d-890a-5173afd14312) |
| **Jupyter notebook** | [sage_image_search_lab.ipynb](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/notebooks/sage_image_search_lab.ipynb) |
| **Lab guide** (NDP setup, steps, production mapping) | [docs/learning.md](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/learning.md) |
| **Videos** | [System overview](https://youtu.be/hzfKL0smzFM) · [Benchmarking](https://youtu.be/NUEs7AeGk4I) |
| **Documentation** | [Overview](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/overview.md) · [Architecture](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/architecture.md) · [Using the Search UI](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/using-the-search-ui.md) |
| **Evaluation** | [Image Search Benchmarking lab](./image-search-bench) · [docs/benchmarking.md](https://github.com/waggle-sensor/sage-nrp-image-search/blob/main/docs/benchmarking.md) · [SageBench](https://huggingface.co/datasets/sagecontinuum/SageBench) · [FireBench](https://huggingface.co/datasets/sagecontinuum/FireBench) · [CloudBench](https://huggingface.co/datasets/sagecontinuum/CloudBench) · [CommonObjectsBench](https://huggingface.co/datasets/sagecontinuum/CommonObjectsBench) · [INQUIRE](https://huggingface.co/datasets/sagecontinuum/INQUIRE-Benchmark-small) |
| **Summer of AI** | [Sage Grande: Summer of AI](/docs/events/2026-Sage-Summer-Hackathon) |
| **Publication** | [USRSE'25 poster](https://doi.org/10.5281/zenodo.17237284) |

<LabButtons id="image-search" />
