# Build stage
FROM openjdk:11-jdk-slim as builder

WORKDIR /app

# Install wget and unzip for Gradle installation
RUN apt-get update && apt-get install -y wget unzip && rm -rf /var/lib/apt/lists/*

# Copy gradle wrapper files
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle ./
COPY settings.gradle ./

# Make gradlew executable
RUN chmod +x gradlew

# Install Gradle manually to fix wrapper issues
RUN wget https://services.gradle.org/distributions/gradle-8.14.2-bin.zip -P /tmp \
    && unzip -d /opt/gradle /tmp/gradle-8.14.2-bin.zip \
    && ln -s /opt/gradle/gradle-8.14.2/bin/gradle /usr/bin/gradle

# Use the installed gradle to build instead of wrapper
RUN gradle dependencies --no-daemon

# Copy source code and build
COPY src ./src
RUN gradle build -x test --no-daemon

# Runtime stage
FROM openjdk:11-jre-slim

WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8081

CMD ["java", "-jar", "app.jar"]
