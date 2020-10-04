import { componentsModule } from "./../components/components.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RecordDetailComponentRoutingModule } from "./record-detail-routing.module";

import { RecordDetailComponent } from "./record-detail.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    componentsModule,
    RecordDetailComponentRoutingModule
  ],
  declarations: [RecordDetailComponent]
})
export class RecordDetailComponentModule {}
