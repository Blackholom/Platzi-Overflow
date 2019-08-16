import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urlJoin from 'url-join';
import {promise} from 'selenium-webdriver';

@Injectable()
export class QuestionService {

    private questionsUrl: string

    constructor(private http: HttpClient) {
        this.questionsUrl = urlJoin(environment.apiUrl, 'questions');
    }

    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionsUrl)
            .toPromise()
            .then( response => JSON.parse(JSON.stringify(response as Question[])))
            .catch(this.handleError);
    }

    getQuestion(id): Promise<void | Question> {
        const url = urlJoin(this.questionsUrl, id);
        return this.http.get(url)
            .toPromise()
            .then(response => JSON.parse(JSON.stringify(response as Question)))
            .catch(this.handleError);
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}
