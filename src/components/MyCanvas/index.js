import React from "react";
import PropTypes from 'prop-types';
import {setAuthorised, setUnAuth} from "../../actions/login";
import {setPoints} from "../../actions/setPoints";
import connect from "react-redux/es/connect/connect";
import ReactDOM from "react-dom";

class MyCanvas extends React.Component {
    constructor(props){
        super(props);

        this.state ={x:0, y:0}
    }


    componentDidMount() {
        this.props.onRef(this);
        this.updateCanvas(this.props.radius);
    }


    updateCanvas(r) {
        const ctx = this.refs.canvas.getContext('2d');

        let all = true;
        this.drawBG(ctx, r);
        this.props.points.map(
            point => {
                return(
                    all &= this.drawPoint(ctx, point.x, point.y, r)
                )
            }
        );

        if(!all){
            ctx.fillStyle="black";
            ctx.font = "14px Times New Roman";
            ctx.fillText('Некоторые точки за пределами графика', 60, 480);
        }
    }

    drawBG(ctx, symbol){
        ctx.clearRect(0,0, 500, 500);
        ctx.fillStyle = "rgba(0, 0, 42, 0.5)";
        ctx.fillRect(0, 0 , 500, 500);

        //triangle
        ctx.beginPath();
        ctx.strokeStyle = "#9a0000";
        ctx.fillStyle = "rgba(154, 0, 0, 0.7)";
        ctx.moveTo(350, 250);
        ctx.lineTo(250, 350);
        ctx.lineTo(250, 250);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //прямоугольник
        ctx.beginPath();
        ctx.moveTo(350, 250);
        ctx.lineTo(350, 50);
        ctx.lineTo(250, 50);
        ctx.lineTo(250, 250);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //сектор
        ctx.beginPath();
        ctx.arc(250, 250, 200, Math.PI, 3*Math.PI/2,false);
        ctx.lineTo(250, 250);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //оси
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        ctx.moveTo(0, 250);
        ctx.lineTo(500, 250);
        ctx.moveTo(250, 0);
        ctx.lineTo(250, 500);
        ctx.stroke();

        //отметки
        ctx.beginPath();
        ctx.moveTo(245, 50);
        ctx.lineTo(255, 50);
        ctx.moveTo(245, 150);
        ctx.lineTo(255, 150);
        ctx.moveTo(245, 350);
        ctx.lineTo(255, 350);
        ctx.moveTo(245, 450);
        ctx.lineTo(255, 450);

        ctx.moveTo(50, 245);
        ctx.lineTo(50, 255);
        ctx.moveTo(150, 245);
        ctx.lineTo(150, 255);
        ctx.moveTo(350, 245);
        ctx.lineTo(350, 255);
        ctx.moveTo(450, 245);
        ctx.lineTo(450, 255);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle="black";
        ctx.font = "20px Times New Roman bold";
        if((!isNaN(parseFloat(symbol)))&&(parseFloat(symbol)!=0)){
            ctx.fillText("-"+symbol, 40, 275);
            ctx.fillText("-"+ (symbol/2), 130, 275);
            ctx.fillText(symbol/2, 340, 275);
            ctx.fillText(symbol, 445, 275);

            ctx.fillText(symbol, 265, 53);
            ctx.fillText(symbol/2, 265, 153);
            ctx.fillText("-"+(symbol/2), 265, 353);
            ctx.fillText("-"+symbol, 265, 453);
            ctx.stroke();
        }
        else{
            ctx.fillText("-R", 40, 275);
            ctx.fillText("-R/2", 130, 275);
            ctx.fillText("R/2", 340, 275);
            ctx.fillText("R", 445, 275);

            ctx.fillText("R", 265, 53);
            ctx.fillText("R/2", 265, 153);
            ctx.fillText("-R/2", 265, 353);
            ctx.fillText("-R", 265, 453);
            ctx.stroke();
        }
    }

    drawPoint(ctx, x, y, radius) {

        if(this.check(x, y, radius)) ctx.fillStyle = "#00FF00";
        else ctx.fillStyle = "#FF5000";
        if(Math.abs(x)/radius > 1.25 || Math.abs(y)/radius >1.25) return false;
        ctx.beginPath();
        ctx.arc(250 + ((x / radius) * 200), 250 - ((y / radius) * 200), 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        return true;
    }

    check(x, y, r) {
        return ((x >= 0 && x <= (r / 2)) && (y >= 0 && y <= r) //прямоугольник
            || (x >= 0 && y < 0) && (y >= x - r / 2) //треугольник
            || (x <= 0 && y >= 0) && (x * x + y * y <= r * r));
    }

    _onMouseMove(e){
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    interactiveCanvas(e){
        let r = this.props.radius;
        let x = (((this.state.x - 250) * r) / 200);
        let y = (((-this.state.y + 250) * r) / 200 );
        this.props.setPoint(x, y, r);
    }


    render() {
        return (
            <canvas onClick={this.interactiveCanvas.bind(this)} onMouseMove={this._onMouseMove.bind(this)} ref="canvas" width={500} height={500}/>
        );
    }
}

MyCanvas.propTypes ={
  radius: PropTypes.string.isRequired,
    setPoint: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return{
        isAuthorised: state.loginReducer.isAuthorised,
        points: state.pointsReducer.points
    }
}

function mapDispatchToProps(dispatch){
    return { setAuthorised: () => {
            dispatch(setAuthorised());
        },
        setUnAuth: () => {
            dispatch(setUnAuth());
        },
        setPoints: (pointsData) => {
            dispatch(setPoints(pointsData));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCanvas);