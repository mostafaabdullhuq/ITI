import { Component } from "@angular/core";

@Component({
    selector: "app-second",
    templateUrl: "./second.component.html",
    styleUrls: ["./second.component.css"],
})
export class SecondComponent {
    public srcSet = [
        "https://images.unsplash.com/photo-1676192203509-3c29d7bb5763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        "https://images.unsplash.com/photo-1602002247992-9b1ea93484e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80",
        "https://images.unsplash.com/photo-1607977569721-4a66186b90ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1604629142559-081c629d4975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        "https://images.unsplash.com/photo-1607977569876-327927982243?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1829&q=80",
    ];

    public imgSrc = this.srcSet[0];
    public slideInterval: any;
    public startSlider() {
        const that = this;
        this.slideInterval = setInterval(
            function (that: any) {
                const index = that.srcSet.indexOf(that.imgSrc);
                if (index === that.srcSet.length - 1) {
                    that.imgSrc = that.srcSet[0];
                } else {
                    that.imgSrc = that.srcSet[index + 1];
                }
            },
            500,
            that
        );
    }

    public stopSlider() {
        clearInterval(this.slideInterval ?? null);
    }

    public slideNext() {
        this.imgSrc = this.srcSet[this.srcSet.indexOf(this.imgSrc) + 1] ?? this.srcSet[this.srcSet.length - 1];
    }

    public slidePrev() {
        this.imgSrc = this.srcSet[this.srcSet.indexOf(this.imgSrc) - 1] ?? this.srcSet[0];
    }
}
