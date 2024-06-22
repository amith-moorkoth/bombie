# Bombie - React Drag and Drop UI Builder Toolkit


<p align="center">
  <img src="src/assets/bombie.gif" alt="Bombie Preview" />
</p>

## Project Description

Bombie is a drag-and-drop builder for Material-UI components in React, designed to streamline the creation of React components through an intuitive interface. This tool allows users to visually assemble Material-UI components and generate corresponding React code, significantly simplifying the development process.

### Key Features

- **Drag-and-Drop Interface:** Easily drag and drop Material-UI components to build complex UIs.
- **Code Generation:** Automatically generate React component code based on the visual layout.
- **Component Customization:** Customize properties of Material-UI components directly within the interface.
- **Real-time Preview:** View the real-time preview of the UI as you build and customize components.

### Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/amith-moorkoth/bombie.git


2. **Navigate to the Project Directory: 
   ```bash
   cd bombie
3. **Install Dependencies:  
   ```bash
   npm install
4. **Start the Development Server: 
   ```bash
    npm start
5. **Access the Application: Open your browser and navigate to http://localhost:8080/generate-component to start using Bombie.
  
<p align="center">
  <img src="src/assets/logo.svg" alt="React Drag and Drop UI Builder Toolkit" width="200" /><br/>
  <b>Form Engine Builder</b>
</p>

# Note
This project is for demonstration purposes. For production usage, further optimization and development may be required.

# Support
Please consider supporting this project for further development. Stay tuned for updates!

# Little Documentation
<ol>
<li>
<p><strong>Purpose and Features</strong>:</p>
<ul>
<li>Bombie is designed for creating React components using a JSON-based approach.</li>
<li>It leverages React DND (Drag and Drop) and Material UI.</li>
<li>The project is intended for demo purposes and is not recommended for production use.</li>
<li>Feedback is welcome to improve the toolkit.</li>
</ul>
</li>
<li>
<p><strong>Workflow Overview</strong>:</p>
<ul>
<li>The main entry point is <code>src/Controller/ComponentGenerator/index.js</code>, where the context provider for the entire application is set up.</li>
<li>The actual screen rendering happens in <code>src/Lib/ComponentGenerator/index.js</code>, which consists of two frames: Drawer and DND Provider.</li>
<li>The <strong>Drawer</strong> displays the JSON data generated through drag-and-drop interactions.</li>
<li>The <strong>DND Provider</strong> shows available elements that can be dragged and dropped into the Drawer for component design.</li>
<li>The recursive container (<code>src/Lib/ComponentGenerator/Container/element-recursion.js</code>) attaches the respective DOM elements based on requirements.</li>
</ul>
</li>
<li>
<p><strong>Why JSON-Based React Material Toolkit?</strong>:</p>
<ul>
<li>Bombie aims to address the need for drag-and-drop design functionality.</li>
<li>By storing React components as JSON in databases (e.g., MongoDB), developers can access them anywhere using a single library in React or JavaScript.</li>
<li>This approach optimizes performance and reduces page loading overhead.</li>
<li>Designers gain control over a significant portion of the development lifecycle.</li>
</ul>
</li>
</ol>
