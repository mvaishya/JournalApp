# Use multi-stage build for better optimization
FROM openjdk:11-jdk-slim as builder

WORKDIR /app

# Copy Gradle wrapper and build files first for better caching
COPY gradlew ./
COPY gradle gradle
COPY gradle/wrapper gradle/wrapper
COPY build.gradle ./
COPY settings.gradle ./

# Make gradlew executable
RUN chmod +x gradlew

# Download dependencies (this layer will be cached if dependencies don't change)
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src src

# Build the application
RUN ./gradlew build -x test --no-daemon

# Production stage
FROM openjdk:11-jre-slim

WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /app/build/libs/journal-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

CMD ["java", "-jar", "app.jar"]
