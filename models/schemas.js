const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  uid: String,
  creator: String,
  name: String,
  description: String,
  marks: Number,
  addToQB: Boolean,
  public: Boolean,
  questionType: String,
  uniqueFields: {
    multipleChoice: {
      answerBox1: String,
      answerBox2: String,
      answerBox3: String,
      answerBox4: String,
      correctBox: String,
    },
    shortAnswer: {
      answer: String
    }
  }
})

const QuizSchema = mongoose.Schema({
    title: String,
    uid: String,
    questions: [{
        name: String,
        description: String,
        marks: Number,
        addToQB: Boolean,
        questionType: String,
        uniqueFields: {
        multipleChoice: {
          answerBox1: String,
          answerBox2: String,
          answerBox3: String,
          answerBox4: String,
          correctBox: String,
        },
        shortAnswer: {
          answer: String
        }
      }
    }]
});

const ReportSchema = mongoose.Schema({
  uid: String,
  qid: String,
  name: String,
  quizLength: Number,
  marksAvailable: Number,
  marksAwarded: Number,
  questionsCorrect: Number,
  startTime: Date,
  endTime: Date,
  postDate: Date,
  questionDetails: [{
    description: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    marksAwarded: Number
  }]
})

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    quizzes: [],
    reports: [],
    questions: []
});

const templateQuiz = {

}

const templateQuestion = {
  "_id": {"$oid": "624efaf678e0b8ea7ef0baf6"},
  "uid": "623374a834ff3b1bea98b30a", 
  "creator": "623374a834ff3b1bea98b30a",
  "name": "Basic Arithmetic",  
  "description": "What is 2 + 2?",  
  "marks": 1,  
  "addToQB": false,  
  "questionType": 
  "multiple-choice-0",  
  "uniqueFields": {
    "multipleChoice": {
      "answerBox1": "3",
      "answerBox2": "4",
      "answerBox3": "5",
      "answerBox4": "6",
      "correctBox": "2"
    },
    "shortAnswer": {
      "answer": null
    }
  },
  "__v": 0}

module.exports = {
    QuizSchema: QuizSchema,
    UserSchema: UserSchema,
    ReportSchema: ReportSchema,
    QuestionSchema: QuestionSchema
}