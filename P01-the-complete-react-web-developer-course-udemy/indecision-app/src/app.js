class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: ['One', 'Two', 'Three']
    }
    this.handleDeleteOption   = this.handleDeleteOption.bind(this);
    this.handlePick           = this.handlePick.bind(this);
    this.handleAddOption      = this.handleAddOption.bind(this);
  }

  handleDeleteOption() {
    this.setState(() => ({options:[]}));
  }

  handlePick() {
    const random = Math.floor(Math.random()*this.state.options.length);
    alert(this.state.options[random]);
  }

  handleAddOption(option) {
    // push manipulates the original array, we should not do it. so we use concat
    if (!option) {
      return 'Enter valid value to add item to list';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({options:prevState.options.concat(option)}));
  }

  render() {
    const title = "Indecision";
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
        <Options
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  }
}



class Header extends React.Component{
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
        onClick={this.props.handlePick}
        disabled={!this.props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOption}>Remove All</button>
        <ol>
          {
            this.props.options.map((option) => <Option key={`${option}-1`} optionText={option}/>)
          }
        </ol>
      </div>
    );
  }
}

class Option extends React.Component {
  render (){
    return (
      <li key={this.props.option}>{this.props.optionText}</li>
    );
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();

    let target = e.target.elements.optionInput.value.trim();
    const error = this.props.handleAddOption(target);
    e.target.elements.optionInput.value="";

    // error is equivalent to error: error
    this.setState(()=>({error}));

  }
  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="optionInput"/>
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}


const appRoot = document.getElementById("app");

ReactDOM.render(<IndecisionApp />, appRoot);
