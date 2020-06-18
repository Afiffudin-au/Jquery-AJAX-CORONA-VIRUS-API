let dataFixs;
$.ajax({
  url : 'https://api.covid19api.com/world/total',
  success:(result)=>{
    $('.total-cases').html(numberWithCommas(result.TotalConfirmed)); 
    $('.recovery-cases').html(numberWithCommas(result.TotalRecovered));
    $('.death-cases').html(numberWithCommas(result.TotalDeaths));
    $.ajax({
      
      url : 'https://api.covid19api.com/summary',
      success:(resultCountries)=>{     
        dataFixs = resultCountries.Countries;
        $('.data-table-body').html(getDataTable(dataFixs));
      },
      error: (e)=>{
        console.log(e.responseText);
      }
    });
  },
  error:(e)=>{
    console.log(e.responseText);
  }
});
function getDataTable(dataFixs){
  return dataFixs.map((dataFix,i)=>{
    return ` <tr>
      <th scope="row">${i+1}</th>
      <td>${dataFix.Country}</td>
      <td>${numberWithCommas(dataFix.TotalConfirmed)}</td>
      <td>+ ${numberWithCommas(dataFix.NewConfirmed)}</td>
      <td>${numberWithCommas(dataFix.TotalDeaths)}</td>
      <td>${numberWithCommas(dataFix.TotalRecovered)}</td>
      <td>${dataFix.Date}</td>
    </tr>`
  });
}
$('.sort').on('change',function(){
 if($(this).val() == 'sortlargest'){
  dataFixs.sort((a,b) =>a.TotalConfirmed < b.TotalConfirmed ? 1 : -1);
 }
 if($(this).val() == 'sortsmalles'){
  dataFixs.sort((a,b) =>a.TotalConfirmed > b.TotalConfirmed ? 1 : -1);
}
 let dataTable = '';
 dataTable = getDataTable(dataFixs);
 $('.data-table-body').html(dataTable);
});
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
