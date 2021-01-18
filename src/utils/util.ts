export const MaskCPFeCNPJ = (value: string) => {
  try {
    const length = value.length;
    let typeDocument = "";
    let valueModify = value.replace(/\D/g, "");

    if (length <= 14) {
      //Coloca um ponto entre o terceiro e o quarto dígitos
      valueModify = valueModify.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      valueModify = valueModify.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um hífen entre o terceiro e o quarto dígitos
      valueModify = valueModify.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      typeDocument = "pf";
    } else {
      //Coloca ponto entre o segundo e o terceiro dígitos
      valueModify = valueModify.replace(/^(\d{2})(\d)/, "$1.$2");

      //Coloca ponto entre o quinto e o sexto dígitos
      valueModify = valueModify.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

      //Coloca uma barra entre o oitavo e o nono dígitos
      valueModify = valueModify.replace(/\.(\d{3})(\d)/, ".$1/$2");

      //Coloca um hífen depois do bloco de quatro dígitos
      valueModify = valueModify.replace(/(\d{4})(\d)/, "$1-$2");
      typeDocument = "pj";
    }

    return { valueModify, typeDocument };
  } catch (error) {
    let valueModify = value;
    let typeDocument = "pf";
    return { valueModify, typeDocument };
  }
};

export const MaskCPFeCNPJVerify = (value: string) => {
  try {
    const length = value.length;
    let typeDocument = "";
    let valueModify = value.replace(/\D/g, "");

    if (length <= 14) {
      //Coloca um ponto entre o terceiro e o quarto dígitos
      valueModify = valueModify.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      valueModify = valueModify.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um hífen entre o terceiro e o quarto dígitos
      valueModify = valueModify.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      typeDocument = "pf";
    } else {
      //Coloca ponto entre o segundo e o terceiro dígitos
      valueModify = valueModify.replace(/^(\d{2})(\d)/, "$1.$2");

      //Coloca ponto entre o quinto e o sexto dígitos
      valueModify = valueModify.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

      //Coloca uma barra entre o oitavo e o nono dígitos
      valueModify = valueModify.replace(/\.(\d{3})(\d)/, ".$1/$2");

      //Coloca um hífen depois do bloco de quatro dígitos
      valueModify = valueModify.replace(/(\d{4})(\d)/, "$1-$2");
      typeDocument = "pj";
    }

    return { valueModify, typeDocument };
  } catch (error) {
    return { error };
  }
};
