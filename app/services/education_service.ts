import Education from '#models/education'

export class EducationService {
  // Your code here
  static async list() {
    return await Education.query().paginate(10)
  }
}
