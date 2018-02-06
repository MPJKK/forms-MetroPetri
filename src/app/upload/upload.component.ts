import {Component, OnInit} from '@angular/core';
import {Media} from '../models/media';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MediaService} from '../services/media.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  file = new Media('', '');

  formData = new FormData();

  constructor(private mediaService: MediaService, private router: Router) {
  }

  setfile(evt) {
    console.log(evt.target.files[0]);
    const file: File = evt.target.files[0];
    // Lisää tiedosto formData-objektiin
    this.formData.append('file', file);
  }

  uploadFile() {
    // lisää tekstikenttion sisältö formdata-objektiin
    this.formData.append('title', this.file.title);
    this.formData.append('description', this.file.description);
    // lähetä tiedot
    this.mediaService.uploadMedia(localStorage.getItem('token'), this.formData).
        subscribe(response => {
          console.log(response);
          this.router.navigate(['front']);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  ngOnInit() {
  }

}
