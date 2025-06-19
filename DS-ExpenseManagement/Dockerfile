
---

## 🐳 `Dockerfile` for Spring Boot App

Create a file named `Dockerfile` in the root of your backend project:

```Dockerfile
# Use a lightweight OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy Maven build artifact into the container
COPY target/expense-tracker-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port (matches server.port)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]

