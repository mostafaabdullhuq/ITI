import { Component } from "@angular/core";

@Component({
    selector: "app-first",
    templateUrl: "./first.component.html",
    styleUrls: ["./first.component.css"],
})
export class FirstComponent {
    public data = "";

    public resetData() {
        this.data = "";
    }
}
