# Learning Algorithms

An interactive, fully client-side web app for visualizing core Operating System algorithms, from CPU scheduling to memory management, virtual memory, deadlock handling, and a lot of other algorithms.

Whether you're studying for an exam or just curious about how these foundational algorithms work behind the scenes, this project helps you explore each one through animated, step-by-step visualizations.

---

## 🔧 Built With

- [Vue 3 (Composition API)](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/) for clean, responsive design
- [Vite](https://vitejs.dev/) for fast development and build performance

---

## 🧠 What This Project Offers

### Algorithm Walkthroughs
Every algorithm includes a brief overview of:
- What problem it's solving  
- How it works conceptually  
- A step-by-step breakdown of execution on user-defined input

### Interactive Inputs
You’re not locked to pre-filled examples. Change process data, resource matrices, memory sizes, and instantly see the results reflected in the visualization.

### Clear, Modern UI
Built to be intuitive for learners, with a clear step-by-step illustration on how the algorithm runs.

---

## Run the Project Locally

Make sure you have:
- Node.js (v16 or above)
- `pnpm`, `npm`, or `yarn`

Then open the terminal in the directory of the project and run:

```bash
npm install
npm run dev
```

# 🙌 Contributions Welcome

Spotted a bug? Have an idea for a new feature or algorithm? Want to improve the UI or fix some typos?

Feel free to open an issue or submit a pull request. Whether it's a small tweak or a big addition, contributions of all kinds are appreciated!

Before submitting, consider:

- Keeping the codebase clean and consistent with the existing structure.
- Writing clear commit messages and PR descriptions.
- Including screenshots or context if your change affects the UI.

Thanks for helping improve the project!

## 📌 Development Guidelines

### Code Formatting

Please ensure you have the appropriate `.vscode` extensions installed as specified in `.vscode/settings.json`. Use the designated formatter for each file type:

- **Vue files (`.vue`)** → Format with [Vue Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **JavaScript & CSS files** → Format with [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Adding a New Algorithm

To scaffold a new algorithm, run:

```bash
npm run generate:algorithm
```

This script will:

- Create a new Vue component in /src/views/algorithms
- Automatically register the route

You can then begin adding your logic and UI. Once your work is complete, submit a pull request on your feature branch.

    🔁 Tip: If your changes affect the UI, include a screenshot or short description in your PR to help reviewers understand the context.