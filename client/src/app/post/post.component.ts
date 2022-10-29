import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';
import { Post } from '../posts/post';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postData: Post = <Post>{};

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    // console.log(this.route.snapshot.paramMap.get('postId'));
    this.postService
      .getPost(<string>this.route.snapshot.paramMap.get('postId'))
      .subscribe((response) => {
        this.postData = <Post>response.post;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
