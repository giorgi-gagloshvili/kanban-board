Follow these steps to get the project running locally:
Clone the repository: git clone https://github.com/giorgi-gagloshvili/kanban-board.git
cd kanban-board
Install dependencies:
npm install

# or

yarn install
Run the development server: npm run dev

Access the app:Open http://localhost:3000 in your browser.🏗

Project Structure:
The project follows a modular component-based architecture for scalability and maintainability

# components

Board.tsx - The main container that manages the state of the columns and drag-and-drop context.

Column.tsx Represents a task status (e.g., To Do, In Progress); handles the dropping logic.

Card: The individual task item; handles the dragging logic.

Filter: Logic to search and filter tasks.

Details Modal: A portal-based view for editing task descriptions and dates.

The Context api is used For global state manegement

# Back-end solution

/api (Mock): A local mock API layer to simulate asynchronous data fetching and persistence.

# Libraries used

Pragmatic Drag and Drop Developed by Atlassian, it is significantly more performant and flexible than react-beautiful-dnd, especially for complex grid/list movements.

Tailwind-merge & clsx Allows for clean, conditional class naming and prevents style conflicts when overriding Tailwind classes in reusable components.

React Icons Provides a unified, tree-shakable icon set to keep the UI intuitive without bloating the bundle size.

React Day Picker - A highly accessible and customizable date picker that integrates perfectly with the task deadline requirements.

Date-fns - A lightweight library used to format deadlines and calculate "due soon" labels within the cards.
