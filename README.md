<p align="center"><img src="./public/icon.svg" width="120" /></p>

<div align="center"><h1>Phishook - Phishing Email Detection</h1></div>

A lightweight phishing email detection system using rule filters and ML techniques. This user-facing web application lets the users interact with the 🔗 [Phishook Detection System](https://github.com/thesevenn/phishook-api.git) API built with Python + FastAPI. Users can upload an email and receive an instant analysis.

![Phishook Demo GIF showing an email scan and verdict](./docs/critical-demo.gif)

### Phishook Web - A User-Friendly Interface for Email Analysis

---

Built with React and TailwindCSS, the Phishook web client offers a streamlined UI for interacting with the detection API — no setup needed. Just upload an email file and get instant analysis with visual verdicts.

👉 Try it yourself at - 🔗 [**Phishook Web**](https://phishook.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/7ad93622-99f2-4f42-bcdc-5593eb538f13/deploy-status)](https://app.netlify.com/projects/phishook/deploys)

Learn more about the detection system by visiting the GitHub repo of the Phishook API above
or 🔗 [here](https://github.com/thesevenn/phishook-api.git).

## ℹ️ Information

This system is a Proof of Concept for the research paper I wrote on **Hybrid Sequential Approach Towards Email Phishing Detection using Rule based and Machine learning Techniques.**

<!-- 👉 Read the paper [here.](https://github.com/thesevenn/phishook-web.git/research.pdf) -->

## 📷 Screenshots

1. Upload page - Desktop view
   ![Upload page Desktop view](./docs/ui_upload.png)

1. Verdict page (Critical) - Desktop view
   ![Verdict page (Critical) - Desktop view](./docs/ui_crit_exp.png)

1. Mobile view - Dark Mode, Light Mode
   ![Mobile view](./docs/mobile_group.png)

## 🪧 Features

- Near Real-time response time (avg. 400ms)
- Instant feedback with Rules triggered
- Zero knowledge detection system
- No user data is stored on server once processed

## 📊 Metrics

### 🎯 Accuracy

- Overall system accuracy: 93.6% (_combined Rule Filters + ML inference_)
- Rule-based filter accuracy: 91.7% (\_Assuming uncertain cases are treated as incorrect)
- ML model accuracy:
  - Email classifier: 99.9% (_trained and tested on a dataset of 40,000 emails_)
  - URL classifier: 91.3% (_trained and tested on 11,000+ URLs_)

### ✅ Performance Metrics

- Average response time: ~600ms (_on 0.1 CPU Render free tier_)
- Worst-case response time: ~1 minute (_due to cold server starts_)
- Average analysis time (Rule + ML): 30ms
- Average ML inference time: 15ms (_Email + URL classifiers combined_)

> [!Note]
> Response time can vary depending on server cold starts and [Render](https://render.com/pricing) tier limitations.

## 🪫 Limitations

- Web service is running on minimal resources limiting performance
- No WHOIS lookup is currently made to reduce response time
- Email attachments are not analyzed in current setting
- No Feedback loop to improve classification models
- No Database is used to create and store caches

## ⚙️ Technologies Used

- ReactJS
- Tailwind CSS
- Shadcn UI Component Library
- Vite
- React Router
- React Query

## 🔭 Future Scope and Features

- Adding feedback loop to utilize uploaded emails into improving classification models
- Handling and analyzing attachments
- More robust and verbose Filters result
- Cached WHOIS lookup to add URL check but keep response time under limit.
- Adding endpoints for only Rule or ML based analysis

## ⬇️ Installation and Setup

To install the web application locally, follow the steps.
The React application was bootstrapped using VITE and pnpm.

```bash
git clone repo
cd ./repo
pnpm install
# or
npm install
```

To run the application locally -

```bash
pnpm run dev
# or
npm run dev
```

## 📢 Disclaimer

This tool provides automated analysis based on known phishing patterns and lightweight models. It is a proof of concept developed for academic purposes and is not intended as a full-fledged or enterprise-grade security solution. While it can help flag suspicious emails, no detection system is perfect. Mistakes can occur. Always use your
judgment and verify critical communications independently before engaging with any email content.

## 📝 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.

You're free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — improve, transform, and build upon the material

**Under the following terms**:

- **Attribution** — You must give appropriate credit.
- **NonCommercial** — You may not use the material for commercial purposes.
- **No Brand Misuse** — The name “Phishook” may not be used to endorse or promote derived works.

📄 [Read full license here](https://creativecommons.org/licenses/by-nc/4.0/)
