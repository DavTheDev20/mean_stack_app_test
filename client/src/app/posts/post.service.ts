import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServerResponse } from './serverResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.postsUrl);
  }

  getPost(postId: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.postsUrl + `/${postId}`);
  }

  addPost(title: string, content: string): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.postsUrl, {
      title: title,
      content: content,
    });
  }
}
