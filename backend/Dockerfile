FROM openjdk:11-jdk-slim

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN chmod +x gradlew
RUN ./gradlew build -x test

EXPOSE 8081

CMD ["java", "-jar", "build/libs/journal-backend-0.0.1-SNAPSHOT.jar"]
