import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Icon, InlineIcon } from "@iconify/react";
import backspaceIcon from "@iconify/icons-fa-solid/backspace";
import timesIcon from "@iconify/icons-fa-solid/times";
import plusIcon from "@iconify/icons-fa-solid/plus";
import minusIcon from "@iconify/icons-fa-solid/minus";
import divideIcon from "@iconify/icons-fa-solid/divide";
import percentageIcon from "@iconify/icons-fa-solid/percentage";
import slashIcon from "@iconify/icons-bi/slash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      operation: "",
      runningTotal: 0,
    };
  }

  checkEntry = (button) => {
    const regEx = /^(\d|\.)$/;
    if (button.match(regEx)) {
      this.handleNumbers(button);
    } else {
      this.handleOperators(button);
    }
  };

  handleNumbers(value) {
    // alert("num is pressed");
    this.setState((state) => {
      if (state.operation === "=") {
        return { operation: "", answer: value }; //if user presses number then equal to then just return whatever button was pressed
      }
      let answer = state.answer + value;
      console.log("answer is", answer);
      if (answer === ".") {
        return { answer: "0." };
      } else {
        return { answer: state.answer + value };
      }
    });
  }

  handleOperators(value) {
    if (value === "+" || value === "-" || value === "X" || value === "/") {
      this.applyOperation(value);
    } else if (value === "+/-") {
      this.plusMinus();
    } else if (value === "%") {
      this.percent();
    } else if (value === "=") {
      this.equals();
    } else if (value === "C") {
      this.reset();
    } else if (value === "CE") {
      this.backspace();
    } else {
      console.error("unsupported function", value);
    }
  }

  applyOperation(currentOperation) {
    if (this.state.answer === "") {
      this.setState({
        operation: currentOperation,
      });
      console.log("current operation is", currentOperation);
    } else {
      this.setState((state) => {
        return {
          runningTotal: this.calculateRunningTotal(
            state.operation,
            state.runningTotal,
            parseFloat(state.answer)
          ),
          operation: currentOperation,
          answer: "",
        };
      });
    }
  }

  reset() {
    this.setState({
      answer: "",
      operation: "",
      runningTotal: 0,
    });
  }

  backspace() {
    this.setState({
      answer: this.state.answer.slice(0, -1),
    });
  }

  plusMinus() {
    this.setState({
      answer: parseFloat(this.state.answer) * -1,
    });
  }

  percent() {
    this.setState({
      answer: parseFloat(this.state.answer) * 0.01,
      //  operation: "X",
    });
  }

  equals() {
    if (this.state.answer === "") {
      this.setState((state) => ({
        answer: state.runningTotal,
        operation: "=",
      }));
    } else {
      this.setState((state) => {
        const calculatedResult = this.calculateRunningTotal(
          state.operation,
          state.runningTotal,
          parseFloat(state.answer)
        );
        return {
          answer: calculatedResult,
          runningTotal: 0,
          operation: "=",
        };
      });
    }
  }

  calculateRunningTotal(operation, currentRunningTotal, newNumber) {
    if (operation === "+") {
      return currentRunningTotal + newNumber;
    } else if (operation === "-") {
      return currentRunningTotal - newNumber;
    } else if (operation === "/") {
      return currentRunningTotal / newNumber;
    } else if (operation === "X") {
      return currentRunningTotal * newNumber;
    } else if (operation === "" || operation === "=") {
      return newNumber;
    }
    throw new Error("Error");
  }

  render() {
    return (
      <Container>
        <Row className="result">
          <input type="text" value={this.state.answer} readOnly />
        </Row>
        {/* <Row className="operation">
          Operator:
          {this.state.operation}
        </Row> */}
        <Row className="keypadRow">
          <Button
            name="C"
            className="functionKeyRed"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            C
          </Button>
          <Button
            name="+/-"
            className="operatorKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={plusIcon} />
            <Icon icon={slashIcon} /> <Icon icon={minusIcon} />
          </Button>
          <Button
            name="%"
            className="operatorKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={percentageIcon} />
          </Button>
          <Button
            name="CE"
            className="functionKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={backspaceIcon} />
          </Button>
        </Row>

        <Row className="keypadRow">
          <Button
            name="1"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            1
          </Button>
          <Button
            name="2"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            2
          </Button>
          <Button
            name="3"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            3
          </Button>
          <Button
            name="+"
            className="operatorKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={plusIcon} />
          </Button>
        </Row>

        <Row className="keypadRow">
          <Button
            name="4"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            4
          </Button>
          <Button
            name="5"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            5
          </Button>
          <Button
            name="6"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            6
          </Button>
          <Button
            name="-"
            className="operatorKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={minusIcon} />
          </Button>
        </Row>

        <Row className="keypadRow">
          <Button
            name="7"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            7
          </Button>
          <Button
            name="8"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            8
          </Button>
          <Button
            name="9"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            9
          </Button>
          <Button
            name="X"
            className="operatorKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={timesIcon} />
          </Button>
        </Row>

        <Row className="keypadRow">
          <Button
            name="."
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            .
          </Button>
          <Button
            name="0"
            className="digitKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            0
          </Button>
          <Button
            name="/"
            className="operatorKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            <Icon icon={divideIcon} />
          </Button>
          <Button
            name="="
            className="equalKey"
            onClick={(e) => this.checkEntry(e.target.name)}
          >
            =
          </Button>
        </Row>
      </Container>
    );
  }
}

export default App;
