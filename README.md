## Setup

### Backend Setup (Strapi)

1. **Install Strapi**: Create a new Strapi project named `backend`:
    ```bash
    npx create-strapi-app@latest backend --quickstart
    ```

2. **Start Strapi**:
    ```bash
    cd backend
    npm run develop
    ```

3. **Create a Collection Type**:
    - Navigate to http://localhost:1337/admin
    - Use the Content-Type Builder to create a new collection type named `image` with a `Media` field for storing images.

4. **Configure API Permissions**:
    - Go to Settings > Roles & Permissions > Public
    - Enable `find` and `findOne` for the `image` collection type.

### Frontend Setup (Vue.js)

1. **Install Vue CLI**:
    ```bash
    npm install -g @vue/cli
    ```

2. **Create a New Vue Project**:
    ```bash
    vue create image-to-story-app
    ```

3. **Navigate to Project Directory**:
    ```bash
    cd image-to-story-app
    ```

4. **Install Dependencies**:
    ```bash
    yarn add vue-router axios
    yarn add @huggingface/inference
    ```

5. **Start the Vue Development Server**:
    ```bash
    yarn serve
    ```

## Obtaining a Hugging Face Access Token

1. **Sign Up or Log In**: Visit [Hugging Face](https://huggingface.co/) and create an account or log in.
2. **Generate Token**:
    - Go to your profile > Settings > API tokens
    - Click on "New API Token" and copy the token.
3. **Add to Environment Variables**:
    - Create a `.env` file in the root directory of your project.
    - Add the token:
      ```env
      HUGGING_FACE_API_KEY=your_hugging_face_api_key
      ```

## Running the Application

### Running the Backend

1. **Start the Strapi server**:
    ```bash
    cd backend
    npm run develop
    ```

### Running the Frontend

1. **Start the Vue.js development server**:
    ```bash
    cd image-to-story-app
    yarn serve
    ```

## API Endpoint

The server exposes an endpoint `/generate-story` to handle POST requests for generating stories from images.

## Usage

1. **Upload an Image**: Use the Strapi admin panel to upload an image.
2. **Generate Story**:
    - Send a POST request to `/generate-story` with the image URL.
    - The server will respond with the generated story and audio path.
3. **View and Listen to Story**: Use the Vue.js frontend to display the story and listen to the generated audio.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
