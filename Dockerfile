FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Copy project files
COPY backend/pom.xml backend/mvnw backend/mvnw.cmd ./
COPY backend/.mvn .mvn
COPY backend/src ./src
COPY backend/setup.sh ./setup.sh

RUN chmod +x ./setup.sh

# Preload dependencies
RUN mvn dependency:go-offline

# Package app
RUN mvn package -DskipTests

EXPOSE 8080

CMD ["mvn", "quarkus:dev", "-Dquarkus.http.host=0.0.0.0"]
