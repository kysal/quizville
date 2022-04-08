export interface Question {
  name: string,
  description: string,
  marks: number,
  addToQB: boolean,
  public: boolean,
  questionType: string,
  uniqueFields: {
    multipleChoice: {
      answerBox1: string,
      answerBox2: string,
      answerBox3: string,
      answerBox4: string,
      correctBox: string,
    },
    shortAnswer: {
      answer: string
    }
  }
}

export interface NewQuestion {

}

export interface Quiz {
  _id: string,
  title: string,
  creator: string,
  postDate: Date,
  questions: Question[]
}

export interface NewQuiz {
  title: string,
  creator: string,
  questions: NewQuestion[]
}
