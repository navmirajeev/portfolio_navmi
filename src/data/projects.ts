import marketImage from "./market.jpg";
import vlmImage from "./vlm.jpg";
import songImage from "./song.jpg";
import pandemicImage from "./pandemic.jpg";
import medicineImage from "./medicine.jpg";
import harvestImage from "./harvest.jpg";


export const projects = [
  {
    number: "01",
    title: "MarketLens",
    category: "Financial Event Intelligence",
    description:
      "A financial intelligence system exploring retrieval-augmented generation for connecting current financial events with historical market context.",
    tags: ["RAG", "LLM", "Python", "AI"],
    image: marketImage,
  },
  {
    number: "02",
    title: "VLM Research",
    category: "Vision-Language Models",
    description:
      "Research into visual-language conflict and attention-head arbitration, exploring whether lightweight adaptive head weighting can reduce cases where language priors override visual evidence.",
    tags: ["VLMs", "PyTorch", "Qwen2.5-VL", "Research"],
    image: vlmImage,
  },
  {
    number: "03",
    title: "Spotify Song Recommendation using Emotion Detection",
    category: "Computer Vision",
    description:
      "A real-time facial emotion recognition system using computer vision and deep learning to identify emotional expressions and provide feedback.",
    tags: ["Python", "DeepFace", "OpenCV", "Streamlit"],
    image: songImage,
  },
  {
    number: "04",
    title:
      "Prototype Pandemic Defense System: CNN-Powered Medical Imaging for Disease Prediction",
    category: "AI for Pandemic Prediction",
    description:
      "A platform built around spotting early signs of a pandemic.",
    tags: ["React", "JavaScript", "AI", "Web"],
    image: pandemicImage,
  },
  {
    number: "05",
    title: "Alternate Medicine Finder",
    category: "AI for Healthcare",
    description:
      "An AI-based system exploring alternative medicine recommendations and information retrieval for healthcare-related use cases.",
    tags: ["AI", "Machine Learning", "Healthcare"],
    image: medicineImage,
  },
  {
    number: "06",
    title: "Harvesting Insights",
    category: "Explainable AI for Agriculture",
    description:
      "An AI-driven agriculture project focused on extracting useful insights from crop-related data and making predictions more interpretable.",
    tags: ["Machine Learning", "Explainable AI", "Agriculture"],
    image: harvestImage,
  },
];

