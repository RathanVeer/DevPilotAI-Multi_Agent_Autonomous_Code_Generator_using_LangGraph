# DevPilotAI - Multi Agent Autonomous Code Generator using LangGraph

This project is an end-to-end AI-powered code generation system inspired by **Lovable**, built using **LangGraph** and a **multi-agent architecture**.

Users can describe any application in plain english text, and the system automatically plans features, designs structure, and generates code step-by-step.

---

## 🧠 How It Works

The system uses **3 coordinated AI agents**:

### Agent Responsibilities Table
| Agent           | Responsibility |
|-----------------|---------------|
| **Planner Agent**   | Understands user prompt and extracts the complete development plan. |
| **Architect Agent** | Converts the high-level plan into step-wise implementation tasks and defines file-level instructions. |
| **Coder Agent**     | Creates or modifies files iteratively using developer tools (`read_file`, `write_file`, `list_files`, etc.). |

These agents communicate via a **LangGraph workflow**, ensuring deterministic and traceable execution.

---

## 🔧 Tech Stack

| Component        | Technology |
|------------------|------------|
| **Language Model** | Groq LLM (`openai/gpt-oss-120b`) |
| **Workflow Engine** | LangGraph |
| **Tools** | Custom read/write/list directory utilities |
| **Environment** | Python 3.11+ |

---

## 📂 Project Features

 ✔ Convert natural-language instructions into working applications  
 ✔ Multi-step incremental code generation (avoids single-shot failures)  
 ✔ File-aware editing using agent tools  
 ✔ Structured planning and execution  
 ✔ Modular agents — easily extendable  

---
```text
📦 project-root
┣ 📂 agent
┃ ┣ prompts.py
┃ ┣ states.py
┃ ┣ tools.py
┃ ┗ graph.py ← main multi-agent workflow
┣ .env ← API keys (ignored in Git)
┣ requirements.txt
┣ README.md
┗ main.py
```

## ▶️ Running the Project

### 1️⃣ Clone the repository
```bash
git clone https://github.com/RathanVeer/DevPilotAI-Multi_Agent_Autonomous_Code_Generator_using_LangGraph.git
cd DevPilotAI-Multi_Agent_Autonomous_Code_Generator_using_LangGraph
```
### 2️⃣ Create and activate virtual environment
```bash
python -m venv .venv
source .venv/bin/activate      # Mac/Linux
.venv\Scripts\activate         # Windows
```
### 3️⃣ Install dependencies
```bash
pip install -r requirements.txt
```
### 4️⃣ Add your API keys in .env
```base
GROQ_API_KEY=your_key_here
```
### 5️⃣ Run the main script
```base
python main.py
```

🛡️ **Environment & Security Notes**
- 🔒 .env contains sensitive keys - already ignored using .gitignore

**🚀 Future Improvements**
- Add UI playground (similar to Lovable)
- Versioning & rollback of generated files
- Support multi-language codebases
- Improve error recovery and self-debugging loops

**⭐ Contributions Welcome**
If you'd like to contribute:
- Open an issue
- Submit a pull request
- Share your ideas in discussions

📬 **Contact** <br>
Rathan Veer <br>
📧 rathanveer.balla@gmail.com <br>
🔗 https://www.linkedin.com/in/rathan-veer-24feb2002/
