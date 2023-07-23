pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
         stage('Clone repository') { 
            steps { 
                script{
                    checkout scm
                }
            }
        }

        stage('Test'){
            steps {
                 echo 'Test'
            }
        }

        stage('Docker Build') {
            agent any
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}