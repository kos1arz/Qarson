import React from "react";
import { CarOffersType } from "./CarOffersType";

type CarCardProps = {
    carDetal: CarOffersType,
    carIndex: number,
    addToCart: (carIndex: number) => void
    deleteCar: (carIndex: number) => void
    errorPhotoUrl: (carIndex: number, newUrl: string) => void
}

type CarCardState = {}

export class CarCard extends React.Component<CarCardProps, CarCardState> {

    private readonly errorPhoto = `${window.location.origin}/error-photo.png`;

    render() {
        return (
            <>
                <div className="car-card-box">
                    <div className="car-card-header position-relative">
                        <img
                            src={this.props.carDetal.photo ? this.props.carDetal.photo : this.errorPhoto}
                            alt="Car"
                            onError={() => this.props.errorPhotoUrl(this.props.carIndex, this.errorPhoto)}
                            className={`${(!this.props.carDetal.availability) ? "opacity-photo" : ""}`}
                        />
                        {!this.props.carDetal.availability &&
                            <h3 className="text-danger error-text-center">Out of stock</h3>
                        }
                    </div>
                    <div className="car-card-body">
                        <div>
                            <h1>{this.props.carDetal.make} {this.props.carDetal.model} {this.props.carDetal.engine}</h1>
                            <h5>Model: {this.props.carDetal.model}</h5>
                            <h5>Make: {this.props.carDetal.make}</h5>
                            <h5>Engine: {this.props.carDetal.engine}</h5>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <button
                                className="button button-danger"
                                onClick={() => this.props.deleteCar(this.props.carIndex)}
                            >
                                Delete
                            </button>
                            {this.props.carDetal.availability &&
                                <button
                                    className="button button-success"
                                    onClick={() => this.props.addToCart(this.props.carIndex)}
                                >
                                    Add to cart
                                </button>
                            }

                        </div>
                    </div>
                </div>
            </>
        );
    }
}