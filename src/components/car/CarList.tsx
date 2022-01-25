import React, { Fragment } from "react";
import { CarCard } from "./CarCard";
import { CarOffersType } from "./CarOffersType";


type CarListProps = {}

type CarListState = {
    carOffers: Array<CarOffersType>,
    error: boolean
}

export class CarList extends React.Component<CarListProps, CarListState> {

    private readonly url = `${window.location.origin}/data.json`;
    private readonly answerSuccess = '200';

    state: CarListState = {
        carOffers: [],
        error: false
    };

    componentDidMount() {
        this.getCarList();
    }

    private addToCart = (carIndex: number): void => {
        const car = this.state.carOffers;
        car[carIndex].availability = false;
        this.setState(prevState => ({
            ...prevState,
            carOffers: car
        }));
    }

    private deleteCar = (carIndex: number): void => {
        const car = this.state.carOffers;
        car.splice(carIndex, 1);
        this.setState(prevState => ({
            ...prevState,
            carOffers: car
        }));
    }

    private getCarList = (): void => {
        fetch(this.url)
            .then(response => response.json())
            .then((data) => {
                if (data.answer !== this.answerSuccess) {
                    this.errorMessage();
                    return;
                }

                this.setState({
                    carOffers: data.offers,
                    error: false
                });
            })
            .catch(() => this.errorMessage());
    }

    private errorPhotoUrl = (carIndex: number, newUrl: string): void => {
        const car = this.state.carOffers;
        car[carIndex].photo = newUrl;
        this.setState(prevState => ({
            ...prevState,
            carOffers: car
        }));
    }

    private errorMessage() {
        this.setState(prevState => ({
            ...prevState,
            error: true
        }));
    }

    render() {
        return (
            <>
                {this.state.error &&
                    <div className="error-message">
                        <p>Problem with data download</p>
                    </div>
                }
                {this.state.carOffers.map((element, index) => {
                    return (
                        <Fragment key={index}>
                            <CarCard
                                carDetal={element}
                                carIndex={index}
                                addToCart={this.addToCart}
                                deleteCar={this.deleteCar}
                                errorPhotoUrl={this.errorPhotoUrl}
                            />
                        </Fragment>
                    );
                })}
            </>
        );
    }
}