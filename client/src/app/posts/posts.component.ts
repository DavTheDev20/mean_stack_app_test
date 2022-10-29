import { Component, OnInit } from '@angular/core';
import { ServerResponse } from './serverResponse';
import { PostService } from './post.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from './post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  serverResponse: ServerResponse = <ServerResponse>{};
  posts: Post[] = [];
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((response) => {
      this.serverResponse = response;
      this.posts = <Post[]>response.posts;
    });
  }

  addPost(): void {
    this.postService
      .addPost(
        <string>this.postForm.value.title,
        <string>this.postForm.value.content
      )
      .subscribe((response) => {
        this.serverResponse = response;
        this.postForm.reset();
        console.log(response);
        this.getPosts();
      });
  }

  alertSubmission(): void {
    event?.preventDefault();
    console.log(this.postForm.value);
  }
}
