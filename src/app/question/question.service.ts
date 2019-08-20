import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urlJoin from 'url-join';
import { promise } from 'selenium-webdriver';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Answer } from '../answer/answer.model';

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

    addQuestion(question: Question): Observable<any> {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(this.questionsUrl, body, { headers })
            .pipe(
                catchError((error: Response) => Observable.throw(error.json()))
            );
    }

    addAnswer(answer: Answer): Observable<any> {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        }
        const body = JSON.stringify(a);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = urlJoin(this.questionsUrl, answer.question._id.toString(), 'answers');

        return this.http.post(url, body, { headers })
            .pipe(
                catchError((error: Response) => Observable.throw(error.json()))
            );
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log(errMsg);
    }
}
