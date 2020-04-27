import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Page } from 'tns-core-modules/ui/page';
import { TextField } from 'tns-core-modules/ui/text-field'; 
import { Slider } from "tns-core-modules/ui/slider";
import { Comment } from '../shared/comment'; 

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    commentForm: FormGroup;
    comment: Comment;

    constructor(private params: ModalDialogParams,
        private page: Page,
        private formBuilder: FormBuilder) {

            this.commentForm = this.formBuilder.group({
                author: ['', Validators.required],
                comment: ['', Validators.required],
                rating: [5, Validators.required]
            });
    }

    ngOnInit() {
    }

    onAuthorChange(args) { 
        let textField = <TextField>args.object;        
        this.commentForm.patchValue({ author: textField.text }); 
    }

    onCommentChange(args) { 
        let textField = <TextField>args.object;
        this.commentForm.patchValue({ comment: textField.text });    
    }

    onRatingChange(args) { 
        let slider = <Slider>args.object;
        this.commentForm.patchValue({ rating: slider.value });    
    }

    onSubmit() {
        this.comment = this.commentForm.value;
        this.comment.date = new Date().toISOString();
        console.log(this.comment);
        this.params.closeCallback(this.comment);
      }
}