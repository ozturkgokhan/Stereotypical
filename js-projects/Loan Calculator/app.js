
// Form variables
// const loanAmount = document.getElementById('amount');
// const interest = document.getElementById('interest');
// const yearsToPay = document.getElementById('years');


// Listen for submit 
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Show loader and hide results
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(CalculateResults, 2000);

  

  e.preventDefault();
});

function CalculateResults(){

  const loanAmount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const yearsToPay = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsToPay.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly*calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);

      //Show Given Information Based to Calculation as a Summary 
      document.getElementById('loan-amount-info').value = loanAmount.value;
      document.getElementById('interest-info').value = interest.value;
      document.getElementById('ytp-info').value = yearsToPay.value;
      document.getElementById('info').style.display = 'block';

      //Clear Input Fields
      loanAmount.value = '';
      interest.value = '';
      yearsToPay.value = '';

      document.getElementById('results').style.display = 'block';
      document.getElementById('loading').style.display = 'none';

  } else{
      const error = 'Something went wrong, please check the given data';
      ShowError(error);
  };

  // Clear error after 3 seconds
  setTimeout(ClearAlert, 3000);

  // console.log(`loanamount: ${loanAmount}`);
  // console.log(`interest: ${interest}`);
  // console.log(`yearsToPay: ${yearsToPay}`);

}

function ClearAlert(){
  if(document.contains(document.querySelector('.alert'))){
    document.querySelector('.alert').remove();
  }
};


function ShowError(error){
  const errorDiv =  document.createElement('div');
  
  errorDiv.className = 'alert alert-danger';
  errorDiv.id = 'errorDiv';
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  card.insertBefore(errorDiv, heading);

}
