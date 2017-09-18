/*
    This service is the "CRUD class" for claims
*/

//Angular Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//JavaScript Imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ClaimService {

    constructor(private http: Http) { }

    //Get Claims
    GET(url: string): Observable<any> {

        return this.http.get(url)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    //Add Claim
    POST(url: string, jsonData: string): Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(url, jsonData, { headers: headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    //Update Claim
    PUT(url: string, jsonData: string): Observable<any> {

        return this.http.put(url, jsonData)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    //Delete Claim
    DELETE(url: string): Observable<any> {

        return this.http.delete(url)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    //Error Handler
    private handleError(error: Response) {

        console.error(error);

        return Observable.throw(error.json().error);
    }
}