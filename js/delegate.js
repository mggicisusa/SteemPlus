/**
 * Created by @stoodkev on 10/23/2017.
 */



var website='';
var created=false;
var load_check='';
var wallet_elt;
var classButton;
var timeout=0;
if(window.location.href.match('steemit.com')) {
    website='steemit';
    load_check=/transfers/;
    wallet_elt=".FoundationDropdownMenu__label";
    classButton="'UserWallet__buysp button hollow delegate";

}
    else if(window.location.href.match('busy.org'))
{
    website='busy';
    load_check=/wallet/;
    wallet_elt=".UserWalletSummary__item ";
    classButton="Action ant-btn-lg Action--primary delegate";
    timeout=1000;

}

if(window.location.href.match(load_check))
    checkLoad();
$(document).click(function(){
    setTimeout(function() {
        if (window.location.href.match(load_check) && !created) {
            created = true;
            checkLoad();
        }
        if (!window.location.href.match(load_check)) {
            created = false;
        }
    },timeout);
});

function checkLoad(){

    if($(wallet_elt).length>1){
        createButton();
    }
    else {
        setTimeout(checkLoad, 1000); // addBeneficiariesButton again in a second
    }
}

function createButton() {
    if($('.delegate').length===0) {
        var delegate_div = document.createElement('div');
        delegate_div.style.width = '100%';
        delegate_div.style.textAlign = 'right';
        var delegate_button = document.createElement('button');
        delegate_button.innerHTML = 'Delegate';
        delegate_button.className = classButton;
        delegate_button.style.display = 'block';
        delegate_button.style.float = 'right';
        if(website==='busy')delegate_button.style.marginTop= '10px';
        delegate_div.appendChild(delegate_button);
        if(website==='steemit')
            $('.UserWallet__balance ')[1].childNodes[1].append(delegate_div);
        else
        {$('.Action ')[0].parentNode.appendChild(delegate_div);console.log(delegate_div);}

        function getMaxSP(){if(website==='steemit')return (parseFloat($(".FoundationDropdownMenu__label")[1].innerHTML.split('-->')[1].split(' ')[0].replace(',',''))-5.001).toFixed(3);
        else return ($('.UserWalletSummary__value')[1].firstChild.firstChild.innerHTML-5.001).toFixed(3);}

        $('.delegate').click(function(){

            var div = document.createElement('div');
            div.id = 'overlay_delegate';
            if(website==='steemit') {
                div.innerHTML = '<div data-reactroot="" role="dialog" style="bottom: 0px; left: 0px; overflow-y: scroll; position: fixed; right: 0px; top: 0px;"><div class="reveal-overlay fade in" style="display: block;"></div><div class="reveal fade in" role="document" tabindex="-1" style="display: block;"><button class="close-button" type="button"><span aria-hidden="true" class="">×</span></button><div><div class="row"><h3 class="column">Delegate</h3>' +
                    '</div><form ><div><div class="row"><div class="column small-12">Delegate SP to another Steemit account.</div></div><br></div><div class="row"><div class="column small-2" style="padding-top: 5px;">From</div><div class="column small-10"><div class="input-group" style="margin-bottom: 1.25rem;"><span class="input-group-label">@</span>' +
                    '<input type="text" class="input-group-field bold"  placeholder="Your account"value="" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=&quot;);"></div></div></div><div class="row"><div class="column small-2" style="padding-top: 5px;">' +
                    'To</div><div class="column small-10"><div class="input-group" style="margin-bottom: 1.25rem;"><span class="input-group-label">@</span><input type="text" class="input-group-field" placeholder="Send to account" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="to" value=""></div><p></p></div></div><div class="row"><div class="column small-2" style="padding-top: 5px;">' +
                    'Amount</div><div class="column small-10"><div class="input-group" style="margin-bottom: 5px;"><input type="text" placeholder="Amount" name="amount" value="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><span class="input-group-label" style="padding-left: 0px; padding-right: 0px;">' +
                    '<span  style="min-width: 5rem; height: inherit; background-color: transparent; border: none;">SP</span></span></div><div style="margin-bottom: 0.6rem;"><a id="max_sp" style="border-bottom: 1px dotted rgb(160, 159, 159); cursor: pointer;">' +
                    'Max*: ' + getMaxSP() + ' SP</a><p>* Maximum delegation available if no SP is currently delegated.</p></div></div></div><div class="row"><div class="column"><span><input type="button"   disabled="" class="UserWallet__buysp button hollow delegate" id="bd" value="Submit"/></span></div></div></form></div></div></div>';
            }
            else
            {
                div.innerHTML='<div><div><div class="ant-modal-mask"></div><div tabindex="-1" class="ant-modal-wrap " role="dialog" aria-labelledby="rcDialogTitle0"><div role="document" class="ant-modal" style="width: 520px; transform-origin: 620.8px 9px 0px;"><div class="ant-modal-content"><button aria-label="Close" class="ant-modal-close"><span class="ant-modal-close-x close-button"></span></button>'+
                    '<div class="ant-modal-header"><div class="ant-modal-title" id="rcDialogTitle0">Delegate SP to another account</div></div><div class="ant-modal-body"><form class="ant-form ant-form-horizontal ant-form-hide-required-mark Transfer container"><div class="ant-row ant-form-item"><div class="ant-form-item-label"><label for="from" class="ant-form-item-required" title=""><span>From</span></label></div><div class="ant-form-item-control-wrapper"><div class="ant-form-item-control "><input type="text" placeholder="Your account" value="" id="from" data-__meta="[object Object]" class="ant-input ant-input-lg"></div></div>'+
                    '<div class="ant-form-item-label"><label for="to" class="ant-form-item-required" title=""><span>To</span></label></div><div class="ant-form-item-control-wrapper"><div class="ant-form-item-control "><input type="text" placeholder="Send to account" value="" id="to" data-__meta="[object Object]" class="ant-input ant-input-lg"></div></div></div>'+
                    '<div class="ant-row ant-form-item"><div class="ant-form-item-label"><label for="amount" class="ant-form-item-required" title=""><span>Amount</span></label></div><div class="ant-form-item-control-wrapper"><div class="ant-form-item-control "><span class="ant-input-group-wrapper" style="width: 100%;"><span class="ant-input-wrapper ant-input-group"><input type="text" placeholder="How much do you want to send" value="" id="amount" data-__meta="[object Object]" name="amount" class="ant-input ant-input-lg"><span class="ant-input-group-addon"><div class="ant-radio-group"><label class="ant-radio-button-wrapper"><span class="ant-radio-button"><input type="radio" class="ant-radio-button-input" value="on"><span class="ant-radio-button-inner"></span></span><span>SP</span></label></div></span></span></span>'+
                    '<span id="max_sp">Max*: <span role="presentation" class="balance">'+getMaxSP()+'</span>.<br/>* Maximum delegation available if no SP is currently delegated.'
                    +'</span></div></div></div></form><span>Click the button below to be redirected to SteemConnect to complete your transaction.</span></div><div class="ant-modal-footer"><button type="button" class="ant-btn ant-btn-lg close-button"><span>Cancel</span></button><input type="button" id="bd" style="margin-left: 1em;"disabled="" class="ant-btn ant-btn-primary ant-btn-lg delegate" value="Send"/></div></div><div tabindex="0" style="width: 0px; height: 0px; overflow: hidden;">sentinel</div></div></div></div></div>'
            }

            $('body').append(div);
            $('.close-button').click(function(){$('#overlay_delegate').remove();});
            $('#max_sp').click(function(){$('input[name=amount]').val(getMaxSP()+'');});
            $('form input').blur(function () {
                if(parseFloat($('input[name=amount]').val())>=0&&parseFloat($('input[name=amount]').val())<=getMaxSP()&&$('input[placeholder="Your account"]').val()!==''&&$('input[placeholder="Send to account"]').val()!=='')
                {$('#bd').prop("disabled",false); }
                else
                {$('#bd').prop("disabled",true); }
            });

            $('#bd').click(function () {

                steem.api.getDynamicGlobalProperties( {


                }).then((result)=>
                {
                    const totalSteem = Number(result.total_vesting_fund_steem.split(' ')[0]);
                    const totalVests = Number(result.total_vesting_shares.split(' ')[0]);
                    const delegated_SP = $('input[name=amount]').val();

                    var delegated_vest = delegated_SP * totalVests / totalSteem;
                    delegated_vest=delegated_vest.toFixed(6);
                    var url = 'https://v2.steemconnect.com/sign/delegateVestingShares?delegator=' + $('input[placeholder="Your account"]').val() + '&delegatee=' + $('input[placeholder="Send to account"]').val() + '&vesting_shares='+delegated_vest+'%20VESTS';
                    window.open(url, '_blank');
                });
            });


        });
    }
}

