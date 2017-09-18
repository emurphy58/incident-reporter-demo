import { Incident } from './Incident'
import { Questionnaire } from './Questionnaire'
import { Answer } from './Answer'
import { Comment } from './Comment'

export interface Claim {

    id: number,
    processId: number,
    incident: Incident
    //questionnaire: Questionnaire
    questionnaire: Questionnaire
    answers: [Answer]
    //answers: [Answer]
    comments: any
    //incidentStatus: string
    customer: string
    photos: any
    approved: boolean
    statedValue: number

}