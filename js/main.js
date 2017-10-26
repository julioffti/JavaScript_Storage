var list = [
    {"desc":"arroz","amount":"8","value":"5.40"},
    {"desc":"sal","amount":"2","value":"1.99"},
    {"desc":"carne","amount":"6","value":"15.00"}
];

//função para calcular o valor total de toda a lista
function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
    return total;
}
//função para exibir a lista
function setList(list){
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');" >Editar</button>  <button class="btn btn-default" onclick="deleteData('+key+');" >Deletar</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage
}

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function  formatAmount(amount){
    return parseInt(amount);
}

function  formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = "R$ " + str;
    return str;
}
//função para adicionar produtos
function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc , "amount":amount ,"value":value });
    setList(list);
}
//função para poder editar os campos
function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}
// função para apagar o que foi escrito nos campos
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}
//função para salvar o que foi editado pela setUpdate
function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount": amount, "value":value };
    resetForm();
    setList(list);
}
 //função para deletar um produto
function deleteData(id){
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}
//função para deletar toda a lista de produtos
function  deleteList() {
    if(confirm("Deletar lista? Todo os produtos serão apagados!!")){
        list = [];
        setList(list);
    }
}
//função para validação
function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";
    if(desc === ""){
        errors += '<p>Informar descrição</p>';
    }
    if(amount === ""){
        errors += '<p>Informar quantidade</p>';
    }else if(amount != parseInt(amount)){
        errors += '<p>Informar valor válido para quantidade</p>';
    }
    if(value === ""){
        errors += '<p>Informar valor do produto</p>';
    }else if(value != parseFloat(value)){
        errors += '<p>Informar valor válido para o produto</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(127, 138, 138, 1)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }
}

//função para salvar os dados
function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

//função trazer para o browser a lista salva no storage
function initListStorage() {
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage()
