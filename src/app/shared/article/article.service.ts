import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
}) 
export class ArticleService {

  list : Article[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Article/AllArticleList')
    .toPromise().then(res => this.list = res as Article[]);
  }

  postArticle (ArticleForm){
    console.log(ArticleForm);
    return this.http.post(this.rootURL+'/Article/CreateArticle',ArticleForm);  
  }

  putArticle(ArticleForm){
    console.log(ArticleForm.ArticleId);
    return this.http.put(this.rootURL+'/Article/UpdateArticle?id='+ ArticleForm.ArticleId, ArticleForm);
  }  

  deleteArticle(id:number){
    return this.http.delete(this.rootURL+'/Article/'+ id);
    
  }
}
