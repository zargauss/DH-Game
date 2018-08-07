/*
 * Copyright (C) - 2018 DHGame
 *
 */

/////////////////////
// Show Roll Modal
function ShowModalRoll(){
// Show modal
$('#modalRoll').modal('show');
}

// Random Roll
function Roll(){
min = parseInt($("#RollMin").val());
max = parseInt($("#RollMax").val());
$("#Roll").text("");
if(min >= max){
  $("#Roll").text("Min doit être < à Max !");
} else {
  $("#Roll").text(getRandomArbitrary(min, max) + " !");
}
}

//////////////////
// Roll on Comp/Atq
function RollCompAtt(elem){
// Compteur
j = 1;
// Reset
$('#modal-body-atq').html("");
$('#modal-body-atq-crit').html("");

if($(elem.parentNode.parentNode).find('.dmg').length > 0) {

  // Crit Value ?
  if($(elem.parentNode.parentNode).next().attr('class') != "table-crit table-warning") {
    critValue = 0;
  } else {
    critValue = $(elem.parentNode.parentNode).find('.CritValue').text();
  }

  // CRIT OR NOT ?
  if(getRandomArbitrary(1, 100) > critValue) {
    // NOT CRIT
    $(elem.parentNode.parentNode).find('.dmg').each(function(i, obj) {
    min = parseInt($(obj).find('.dmg-min').text());
    max = parseInt($(obj).find('.dmg-max').text());

    if($(obj).attr('class') == "btn btn-primary btn-sm dmg") {
      type = "primary";
    } else {
      if($(obj).attr('class') == "btn btn-danger btn-sm dmg") {
        type = "danger";
      } else {
        type = "success";
      }
    }
    
    // Add DMG on modal
    $('#modal-body-atq')
        .append($('<div>')
            .attr('class', 'btn-group btn-modal-atq')
            .attr('role', 'group')
            .attr('style', 'padding-bottom: 5px;')
            .append($('<button>')
                .attr('type', 'button')
                .attr('class', 'btn btn-outline-' + type)
                .attr('disabled', true)
                .text($(obj.parentNode.parentNode).find('.' + j).text()))
            .append($('<button>')
                .attr('type', 'button')
                .attr('class', 'btn btn-' + type)
                .attr('disabled', true)
                .append($('<b>')
                    .text(getRandomArbitrary(min, max) + " !"))))
        .append($('<br>'));
    // Compteur + 1
    j = j + 1;
    });

    // Show modal
    $('#modalAtt').modal('show');

  } else {
    // CRIT
    $(elem.parentNode.parentNode).next().find('.dmg-crit').each(function(i, obj) {
    dmg = $(obj).html();
    min = parseInt($(obj).find('.dmg-crit-min').text());
    max = parseInt($(obj).find('.dmg-crit-max').text());

    if($(obj).attr('class') == "btn btn-primary btn-sm dmg-crit") {
      type = "primary";
    } else {
      if($(obj).attr('class') == "btn btn-danger btn-sm dmg-crit") {
        type = "danger";
      } else {
        type = "success";
      }
    }

    // Add DMG on modal
    $('#modal-body-atq-crit')
        .append($('<div>')
            .attr('class', 'btn-group btn-modal-atq-crit')
            .attr('role', 'group')
            .attr('style', 'padding-bottom: 5px;')
            .append($('<button>')
                .attr('type', 'button')
                .attr('class', 'btn btn-outline-' + type)
                .attr('disabled', true)
                .text($(obj.parentNode.parentNode).find('.' + j).text()))
            .append($('<button>')
                .attr('type', 'button')
                .attr('class', 'btn btn-' + type)
                .attr('disabled', true)
                .append($('<b>')
                    .text(getRandomArbitrary(min, max) + " !"))))
        .append($('<br>'));
    // Compteur + 1
    j = j + 1;
    });

    // Show modal
    $('#modalAttCrit').modal('show');

  }

}

// ALL COMP -> RED
$('.table-actif').each(function(i, obj) {
  $(obj).attr('class', '');
  $(obj).attr('class', 'table-danger');
  $(obj).find('.Atq').attr('disabled', true);
})

// GESTION POWER
if(($(elem.parentNode.parentNode).find('.moinspower')).length == 0) {
  PWR = parseInt($('#PWR').text());
  PWRPLUS = parseInt($(elem.parentNode.parentNode).find('.pluspower').text());
  $('#PWR').text(PWR + PWRPLUS);
} else {
  PWR = parseInt($('#PWR').text());
  PWRMOINS = parseInt($(elem.parentNode.parentNode).find('.moinspower').text());
  $('#PWR').text(PWR - PWRMOINS);
}

if(parseInt($('#PWR').text()) >= $('#PWR-MAX').text()) {
  $('#PWR').text($('#PWR-MAX').text());
}
 if(parseInt($('#PWR').text()) < 0) {
  $('#PWR').text(0);
}
}

//////////////////
// Down Function
function Down(elem) {
$(elem.parentNode.parentNode).attr('class', 'table-secondary');
$(elem.parentNode).find('.Atq').attr('disabled', true);
$(elem).attr('class', '');
$(elem).attr('class', 'Up btn btn-success btn-sm');
$(elem).html('<i class="fas fa-angle-double-up">');
$(elem).click(function () {
   Up(elem);
});

//SET ARMOR
if($(elem.parentNode.parentNode.parentNode.parentNode).attr('id') == "table-armor") {
  setArmor(elem);
}
}

/////////////////
// Up Function
function Up(elem) {
$(elem.parentNode.parentNode).toggleClass('table-secondary table-actif');
$(elem.parentNode).find('.Atq').attr('disabled', false);
$(elem).attr('class', '');
$(elem).attr('class', 'Down btn btn-danger btn-sm');
$(elem).html('<i class="fas fa-times">');
$(elem).click(function () {
   Down(elem);
});

//SET ARMOR
if($(elem.parentNode.parentNode.parentNode.parentNode).attr('id') == "table-armor") {
  setArmor(elem);
}
}

///////////////////////
// Show modal Debuff
function ShowAddDebuff() {
// Show modal
$('#modalDeBuff').modal('show');
}

// Add Debuff
function AddDeBuff() {
buff = $('#selectDebuff').val();
tour = $('#setTourD').val();
$('#Debuff_list:last')
    .append($('<div>')
        .attr('class', 'btn-group')
        .attr('role', 'group')
    .append($('<button>')
        .attr('type', 'button')
        .attr('class', 'btn-close btn btn-danger btn-list')
        .html('<i class="fas fa-times"></i>'))
    .append($('<button>')
        .attr('type', 'button')
        .attr('class', 'btn-B btn-Debuff btn btn-danger btn-list')
            .append(buff + "  ")
            .append($('<span>')
                .attr('class', 'badge badge-light badge-pill text-danger')
                .append(tour)))
    .append($('<button>')
        .attr('type', 'button')
        .attr('class', 'btn-plus btn btn-danger btn-list')
        .html('<i class="fas fa-plus"></i>')));

$('.btn-close').click(function () {
   RemoveBuff(this);
});

$('.btn-plus').click(function () {
     PlusBuff(this);
});

// Hide modal
$('#modalDeBuff').modal('hide');
}

//////////////////////////
// Show modal buff
function ShowAddBuff() {
// Show modal
$('#modalBuff').modal('show');
}

// Add Buff
function AddBuff() {
buff = $('#selectBuff').val();
tour = $('#setTourB').val();
$('#Buff_list:last')
    .append($('<div>')
        .attr('class', 'btn-group')
        .attr('role', 'group')
    .append($('<button>')
        .attr('type', 'button')
        .attr('class', 'btn-plus btn btn-success btn-list')
        .html('<i class="fas fa-plus"></i>'))
    .append($('<button>')
        .attr('type', 'button')
        .attr('class', 'btn-B btn-Buff btn btn-success btn-list')
            .append(buff + "  ")
            .append($('<span>')
                .attr('class', 'badge badge-light badge-pill text-success')
                .append(tour)))
    .append($('<button>')
        .attr('type', 'button')
        .attr('class', 'btn-close btn btn-success btn-list')
        .html('<i class="fas fa-times"></i>')));

$('.btn-close').click(function () {
   RemoveBuff(this);
});

$('.btn-plus').click(function () {
     PlusBuff(this);
});

// Hide modal
$('#modalBuff').modal('hide');
}

//////////////////////////
// Remove Debuff/Buff
function RemoveBuff(elem) {
$(elem.parentNode).remove();
}

// Add Tour on Debuff/Buff
function PlusBuff(elem) {
tour = parseInt($(elem.parentNode).find('.btn-B').children().text());
$(elem.parentNode).find('.btn-B').children().text(tour + 1);
}

//////////////////////////
// LOCK / UNLOCK
function lock() {
  $('#CompTab').find('.Up').each(function(i, obj) {
  	$(obj).attr('disabled', true);
  });
  $('#CompTab').find('.Down').each(function(i, obj) {
  	$(obj).attr('disabled', true);
  });

  $('.lock').html("");
  $('.lock').html('<i class="fas fa-lock"></i>');

  $('.lock').attr('onclick', 'unlock()');
}

function unlock() {
  $('#CompTab').find('.Up').each(function(i, obj) {
  	$(obj).attr('disabled', false);
  });
  $('#CompTab').find('.Down').each(function(i, obj) {
  	$(obj).attr('disabled', false);
  });

  $('.lock').html("");
  $('.lock').html('<i class="fas fa-unlock">');

  $('.lock').attr('onclick', 'lock()');
}

//////////////////////////
// RESET
function reset() {
  $('.table-danger').each(function(i, obj) {
  $(obj).attr('class', '');
  $(obj).attr('class', 'table-actif');
  $(obj).find('.Atq').attr('disabled', false);
  });
}

//////////////////////////
// Show Modal Change Stats
function ShowModalChange(elem_main_page, elem_modal, modal) {
$('#' + elem_modal).val(parseInt($('#' + elem_main_page).text()));
// Show modal
$('#' + modal).modal('show');
}

// Set Changes Stats
function SetChange(elem_main_page, elem_modal, modal) {
$('#' + elem_main_page).text($('#' + elem_modal).val());
// Hide modal
$('#' + modal).modal('hide');
}

//////////////////////
// Random Function
function getRandomArbitrary(min, max){
return Math.floor(Math.random() * (max - min + 1)) + min;
}

///////////////////////
// Fin du tour
function FinDuTour() {
// -1 ALL DEBUFFS/BUFFS
$('.btn-B').each(function(i, obj) {
  tour = $(obj).children().text();
  if(tour == 1) {
    $(obj.parentNode).remove();
  } else {
    $(obj).children().text(tour - 1)
  }
})

// ALL COMP RED -> ACTIF
$('.table-danger').each(function(i, obj) {
  $(obj).attr('class', '');
  $(obj).attr('class', 'table-actif');
  $(obj).find('.Atq').attr('disabled', false);
})
}

///////////////////////
// Fin du combat
function FinDuCombat() {
// ALL COMP RED -> ACTIF
$('.table-danger').each(function(i, obj) {
  $(obj).attr('class', '');
  $(obj).attr('class', 'table-actif');
  $(obj).find('.Atq').attr('disabled', false);
})

// REMOVE ALL DEBUFFS/BUFFS
$('.btn-B').each(function(i, obj) {
  $(obj.parentNode).remove();
})

// PWR 0
$('#PWR').text(0);
}

////////////////////////
// SET ARMURE
function setArmor(elem) {

if($(elem.parentNode.parentNode).attr('class') == "table-actif") {
  PV = parseInt($(elem.parentNode.parentNode).find('.PV-Armor').text());
  AR = parseInt($(elem.parentNode.parentNode).find('.AR-Amor').text());
  BM = parseInt($(elem.parentNode.parentNode).find('.BM-Armor').text());

  PVMAX = parseInt($('#PV-MAX').val());
  ARMAX  = parseInt($('#AR-MAX').val());
  BMMAX = parseInt($('#BM-MAX').val());

  PVARMOR = PV + PVMAX; 
  ARARMOR = AR + ARMAX;
  BMARMOR = BM + BMMAX;

  $('#PV-MAX-B').text(PVARMOR);
  $('#AR-MAX-B').text(ARARMOR);
  $('#BM-MAX-B').text(BMARMOR);

} else {

  PVMAX = parseInt($('#PV-MAX').val());
  ARMAX  = parseInt($('#AR-MAX').val());
  BMMAX = parseInt($('#BM-MAX').val());

  $('#PV-MAX-B').text(PVMAX);
  $('#AR-MAX-B').text(ARMAX);
  $('#BM-MAX-B').text(BMMAX);
}
}

//////////////////////////
// CRIT
function Crit(elem){
	if($(elem.parentNode.parentNode.parentNode).next().attr('class') == "table-crit table-warning") {
	  if($(elem.parentNode.parentNode.parentNode).next().attr('style') == null){
	    $(elem.parentNode.parentNode.parentNode).next().attr('style', 'display: none;');
	  } else {
	    $(elem.parentNode.parentNode.parentNode).next().attr('style', null);
	  }
	}
}

///////////////////////////
// RANDOM DEBUFF
function randomDebuff() {
  var debuff = ["Affaibli", "Aveuglement", "Brise armure", "Brûlure", "Confusion", "Electrocution", "Empoisonnement", "Faiblesse", "Gel mental", "Lien de vie", "Peur", 
  "Potentialisation", "Ralentissement", "Saignement", "Silence", "Suppression", "Vulnérable", "Provocation"];

  $('#randomdebuff').text("");
  $('#randomdebuff').text(debuff[getRandomArbitrary(0, debuff.length - 1)]);

  $('#modalrandomdebuff').modal('show');
}

//////////////////////////
// Set Click Buttons
// Set OnClick Function on .Down & .Up Class
$('.Down').click(function () {
   Down(this);
});
$('.Up').click(function () {
   Up(this);
});

// Add Debuff
$('.add-Debuff').click(function () {
   ShowAddDebuff();
});

// Add Buff
$('.add-Buff').click(function () {
   ShowAddBuff();
});

// Remove Buff on Btn
$('.btn-close').click(function () {
   RemoveBuff(this);
});

// Add Tour on Btn
$('.btn-plus').click(function () {
   PlusBuff(this);
});