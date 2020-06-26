import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ActsRoutingModule } from "../acts-routing.module";

import { RulesComponent } from './rules.component';
import { RulesListComponent } from './rules-list/rules-list.component';

@NgModule({
  declarations: [
    RulesComponent,
    RulesListComponent
  ],
  imports: [
    ActsRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class RulesModule { }
