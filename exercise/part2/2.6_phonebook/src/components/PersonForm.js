const PersonForm = ({newNameValue, newNumValue, handleNewName, handleNewNum, handleSubmit}) => (
    <form>
        <div>
            name: <input value={newNameValue} onChange={event => handleNewName(event.target.value)}/>
        </div>
        <div>
            number: <input value={newNumValue} onChange={event => handleNewNum(event.target.value)}/>
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>add</button>
        </div>
    </form>
)

export default PersonForm