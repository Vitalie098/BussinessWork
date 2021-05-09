import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MaterialService} from "../../classes/material.services"
import {AuthService} from "../../services/auth.services"


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating') floatingref: ElementRef
  links = [
    {url:"/overview", name: "Prezentare generală"},
    {url: '/analytics', name: 'Analitica'},
    {url: '/history', name: 'Istoria'},
    {url: '/order', name: 'Adauga comenzi'},
    {url: '/categories', name: 'Categorii'}
  ]

  constructor(private auth: AuthService,
              private router: Router) { }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingref)
  }

  logout(event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(["/login"])
  }

}
