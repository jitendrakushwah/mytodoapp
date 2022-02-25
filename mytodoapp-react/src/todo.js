import React, { useEffect, useState } from "react";

const getitem = () => {
  const getLI = localStorage.getItem("list");
  if (getLI) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function Todolist() {
  const [inputData, setinputData] = useState("");
  const [item, setitem] = useState(getitem());
  const [EditI, setEditI] = useState(true);
  const [Edit, setEditid] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);

  return (
    <div className="App">
      <h2 className="heading">My To Do List React </h2>
      <div className="inputdiv">
        <input
          type="text"
          placeholder="Add Your Items"
          value={inputData}
          onChange={(e) => setinputData(e.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              if (!inputData) {
              } else {
                const Input1 = {
                  id: new Date().getTime().toString(),
                  name: inputData,
                };
                setitem([...item, Input1]);
                setinputData("");
              }
            }
          }}
        />
        {EditI ? (
          <button
            onClick={() => {
              if (!inputData) {
                alert("please fill the data");
              } else {
                const Input1 = {
                  id: new Date().getTime().toString(),
                  name: inputData,
                };
                setitem([...item, Input1]);
                setinputData("");
              }
            }}
          >
            Add
          </button>
        ) : (
          <i
            className="bi bi-pencil-square"
            onClick={() => {
              if (!inputData) {
              } else {
                let saveedit = item.find((curval) => {
                  return curval.id === Edit.id;
                });
                saveedit.name = inputData;
                // console.log(saveedit);
                setEditI(true);
                setinputData("");
              }
            }}
          ></i>
        )}
        <button
          onClick={() => {
            console.log([]);
            setitem([]);
          }}
        >
          Delete All Item
        </button>
      </div>
      {item.map((el, I) => {
        //   console.log(el.id)
        return (
          <ul key={el.id}>
            <li>
              {el.name}
              <i
                className="bi bi-pencil-square"
                onClick={() => {
                  setinputData(el.name);
                  setEditI(false);
                  setEditid(el);
                }}
              ></i>
              <i
                className="bi bi-trash"
                onClick={() => {
                  setitem(item.filter((cvalue) =>{ 
                      
                    //   console.log(cvalue)
                    //   console.log(el.id)

                    return cvalue.id !== el.id;
                
                }));
                }}
              ></i>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
export default Todolist;
