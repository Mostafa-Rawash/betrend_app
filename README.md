<div align="center" dir="auto">

<img src="https://github.com/Mostafa-Rawash/betrend_app/assets/52187438/8ea8fbd8-f2c7-4f4e-90ab-ac0fdab13076" alt="drawing" width="200" />
</div>

# Betrend App

**Betrend App** is a Frappe Framework-based application designed to streamline fashion trend analysis and retail operations. Built on the robust Frappe ecosystem, it integrates modular features and AI-powered insights to enhance business processes.

## Features

- **Frappe Integration**: Leverages the Frappe framework's modularity and scalability.
- **Custom Doctypes**: Built to support fashion and retail operations.
- **AI Capabilities**: Provides personalized recommendations using AI-powered modules.
- **User Management**: Includes role-based access control for secure and efficient user management.

## Prerequisites

Before setting up the Betrend App, ensure you have:

- [Frappe Bench](https://frappeframework.com/docs/v13/user/en/bench)
- [Python 3.7+](https://www.python.org/)
- [Node.js](https://nodejs.org/) (For asset building)
- [Redis](https://redis.io/) and a compatible database (e.g., MariaDB or PostgreSQL)

## Installation

1. Install Frappe Bench:
   Follow the [official Frappe installation guide](https://frappeframework.com/docs/v13/user/en/installation).

2. Create a new site:
   ```bash
   bench new-site betrend.local
   ```

3. Install the Betrend App:
   ```bash
   bench get-app https://github.com/Mostafa-Rawash/betrend_app
   bench --site betrend.local install-app betrend_app
   ```

4. Start the development server:
   ```bash
   bench start
   ```

5. Access the application in your browser at `http://localhost:8000`.

## Project Structure

- **`betrend_app/`**: Contains the Frappe application files, including:
  - **`config/`**: App configurations.
  - **`modules/`**: Custom modules and doctypes.
  - **`public/`**: Static assets like JS, CSS, and images.
  - **`templates/`**: HTML templates for web pages.
- **`hooks.py`**: Custom hooks to extend Frappe’s functionality.

## Configuration

- Modify the `hooks.py` file to customize app behavior and integrate custom events.
- Use `site_config.json` in the site directory to manage site-specific configurations.

## Usage

- **Run development server**:
  ```bash
  bench start
  ```

- **Build assets**:
  ```bash
  bench build
  ```

- **Access site shell**:
  ```bash
  bench --site betrend.local console
  ```

- **Database management**:
  ```bash
  bench --site betrend.local mysql
  ```

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For support or inquiries, reach out to **Mostafa Rawash** via [mostafa@rawash.com](mailto:mostafa@rawash.com).
