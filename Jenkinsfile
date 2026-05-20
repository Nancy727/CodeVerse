// pipeline {
//     agent any

//     stages {

//         stage('GitHub Connected') {
//             steps {
//                 echo 'Repository Connected Successfully'
//             }
//         }

//         stage('Docker Check') {
//             steps {
//                 sh 'docker --version'
//             }
//         }

//         stage('Running Containers') {
//             steps {
//                 sh 'docker ps'
//             }
//         }

//         stage('Deployment Verification') {
//             steps {
//                 sh 'curl -I http://35.154.211.203'
//             }
//         }

//         stage('Success') {
//             steps {
//                 echo 'CloudVerse CI/CD Pipeline Executed Successfully'
//             }
//         }
//     }
// }


pipeline {
    agent any

    stages {

        stage('GitHub Connected') {
            steps {
                echo 'Repository Connected Successfully'
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Running Containers') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Deployment Verification') {
            steps {
                sh 'curl -I http://35.154.211.203'
            }
        }

        stage('Success') {
            steps {
                echo 'CloudVerse CI/CD Pipeline Executed Successfully'
            }
        }
    }
}