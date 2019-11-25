class PalletDataValidator
{
    minNumberOfBoards = 2;
    inputsContainer = $("#inputs-container > input");

    constructor(pallet) {
        this.pallet = pallet;
    }

    validate = () => {
        if (!this.areAllInputsFilled()) {
            $('#inputs-errors').text('Nie wszystkie pola formularza zostały wypełnione');
            return false;
        }
        if (!this.isNumberOfBoardsInt()) {
            $('#inputs-errors').text('Liczba desek nie jest liczbą całkowitą');
            return false;
        }
        if (!this.areAllNumbersGreaterThan0()) {
            $('#inputs-errors').text('Nie wszystkie liczby są większe od 0');
            return false;
        }
        if (!this.doPalletsHaveMinNumberOfBoards(this.minNumberOfBoards)) {
            $('#inputs-errors').text('Paleta musi mieć co najmniej 2 deski');
            return false;
        }
        if (!this.arentBoardsWiderThatPallet()) {
            $('#inputs-errors').text('Suma długości desek jest większa niż długość palety');
            return false;
        }
        if (!this.areWidthAndHeightCorrect()) {
            $('#inputs-errors').text('Paleta nie może być dłuższa niż 5000mm i szersza niż 2400mm');
            return false;
        }

        $('#inputs-errors').text('');

        return true;
    }

    areAllInputsFilled = () => {
        return (this.inputsContainer.filter(function () { return $.trim($(this).val()).length === 0}).length === 0);
    }

    arentBoardsWiderThatPallet = () => {
        return (this.pallet.width >= this.pallet.numberOfVerticalBoards * this.pallet.widthOfVerticalBoard &&
            this.pallet.length >= this.pallet.numberOHorizontalBoards * this.pallet.widthOfHorizontalBoard);
    }

    doPalletsHaveMinNumberOfBoards = (boards) => {
        return (this.pallet.numberOHorizontalBoards >= boards &&
            this.pallet.numberOfVerticalBoards >= boards &&
            this.pallet.baseBoardNumber >= boards);
    }

    isNumberOfBoardsInt = () => {
        return (Math.floor(this.pallet.numberOHorizontalBoards) == this.pallet.numberOHorizontalBoards &&
        Math.floor(this.pallet.numberOfVerticalBoards) == this.pallet.numberOfVerticalBoards);
    }

    areAllNumbersGreaterThan0 = () => {
        return (this.pallet.width > 0 &&
        this.pallet.length > 0 &&
        this.pallet.numberOHorizontalBoards > 0 &&
        this.pallet.numberOfVerticalBoards > 0 &&
        this.pallet.widthOfVerticalBoard > 0 &&
        this.pallet.widthOfHorizontalBoard > 0);
    }

    areWidthAndHeightCorrect = () => {
        let maxLength = 5000;
        let maxWidth = 2400;

        return (this.pallet.length <= maxLength &&
        this.pallet.width <= maxWidth);
    }
}