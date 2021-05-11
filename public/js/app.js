console.log(React);

class App extends React.Component {
  state = {
    plants: [],
    name: "",
    image: "",
    notes: "",
    season: ""
  }

/* ----- HANDLE CHANGE: ------  */

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

/* ------ HANDLE SUBMIT: ------  */

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/plants', this.state).then(
      (response) => {
        this.setState({
          plants: response.data,
          name: "",
          image: "",
          notes: "",
          season: ""
        })
      }
    )
  }

/* ------------- UPDATE PLANT -------------  */

updatePlant = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/plants/' + id, this.state).then(
    (response) => {
      this.setState({
        plants: response.data,
        name: "",
        image: "",
        notes: "",
        season: ""
      })
    }
  )
}

/* ------------- DELETE PLANT -------------  */

deletePlant = (event) => {
  axios.delete('/plants/' + event.target.value).then(
    (response) => {
      this.setState({
        plants: response.data
      })
    }
  )
}

/* ----- MOUNT DATA ON LOAD FUNCTION: ------  */
  componentDidMount = () => {
    axios.get('/plants').then(response => {
      this.setState({
        plants: response.data
      })
    })
  }
/*  ------ END COMPONENT DID MOUNT -----  */

  render = () => {
    return <div>

      <section className="add-plants">
        <form onSubmit={this.handleSubmit} id="add-plant">
        <h3>Add to The Garden</h3>
          <label htmlFor="name">Name</label><br/>
          <input
            type="text"
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
          /><br/>

          <label htmlFor="image">Image</label><br/>
          <input
            type="text"
            id="image"
            onChange={this.handleChange}
            value={this.state.image}
          /><br/>

          <label htmlFor="notes">Notes</label><br/>
          <input
            type="text"
            id="notes"
            onChange={this.handleChange}
            value={this.state.notes}
          /><br/>

          <label htmlFor="season">Growing Season</label><br/>
          <input
            type="text"
            id="season"
            onChange={this.handleChange}
            value={this.state.season}
          /><br/>

          <input type="submit" id="Add Plant" />

        </form>
      </section>

      <section className="plant-list">
        <ul>
          {this.state.plants.map(plant => {
            return (
              <li key={plant._id}>
                <h2>{plant.name}</h2>
                <img src={plant.image} alt={plant.name} />
                <div className="dropdowns">
                  <details>
                    <summary>Notes</summary>
                      <p>Growing season: {plant.season}</p>
                      <p>{plant.notes}</p>
                  </details>
                  <details>
                    <summary>Edit / Delete</summary>
                    <form id={plant._id} onSubmit={this.updatePlant}>
                      <label htmlFor="name">Name</label><br/>
                      <input
                        type="text"
                        id="name"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="image">Image</label><br/>
                      <input
                        type="text"
                        id="image"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="notes">Notes</label><br/>
                      <input
                        type="text"
                        id="notes"
                        onChange={this.handleChange}
                      /><br/>

                      <label htmlFor="season">Growing Season</label><br/>
                      <input
                        type="text"
                        id="season"
                        onChange={this.handleChange}
                      /><br/>

                      <input type="submit" id="Submit Edits" />

                    </form>
                    <button value={plant._id} onClick={this.deletePlant}>Delete</button>
                  </details>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
