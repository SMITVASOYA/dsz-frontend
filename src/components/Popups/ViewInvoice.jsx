import { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

function ViewInvoice({ visible, file, close, data }) {
  if (data) {
    var invoice_data = data.invoice_data ? JSON.parse(data.invoice_data) : {};
    // quotation_data = {};
  }

  useEffect(() => {
    setURL(`http://128.199.26.175:3006/generate/docs/invoices/${file}.pdf`);
  }, [file]);

  const [Loading, setLoading] = useState(false);
  const [URL, setURL] = useState(
    `http://128.199.26.175:3006/generate/docs/invoices/${file}.pdf`
  );
  const [Error, setError] = useState("");

  console.log(URL);

  const handelGenerate = async () => {
    if (!invoice_data[0]) {
      setError("Invoice Data is Not Available");
    } else {
      let pevData = { ...invoice_data[0] };
      pevData["generatedInvoiceNumber"] = data.generatedInvoiceNumber;
      //   pevData["quotation"] = "old";

      // console.log(pevData);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pevData),
      };

      setLoading(true);

      // console.log(Loading);

      try {
        setError("");

        await fetch(
          `http://128.199.26.175:3006/downloadInvoice`,
          requestOptions
        )
          .then((response) => response.text())
          .then((text) => {
            setURL(text);
          });
      } catch {
        setError("Error while Generating Quotation!");
      }
      // console.log(URL)
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[98%] md:w-[1000px] h-[85%] overflow-y-scroll  rounded-md">
        <div className="sticky top-0 backdrop-blur-sm bg-bg bg-opacity-20">
          <div className="flex justify-between px-5 md:px-20 pt-5 pb-2">
            <h1 className="heading text-lg">View Invoice</h1>
            <XCircleIcon onClick={() => close(false)} className="w-8" />
          </div>
        </div>

        <object
          data={URL}
          type="application/pdf"
          width="100%"
          height="100%"
          className="W-[90%] h-screen mx-auto"
        >
          <div className="flex justify-center items-center flex-col mt-10">
            <button
              className=" py-2 px-4 bg-green-500 rounded-md shadow-sm text-white"
              onClick={() => {
                handelGenerate();
              }}
            >
              {Loading ? "Regenerate Quotation..." : "Regenerate Quotation"}{" "}
            </button>
            {URL && (
              <a href={URL} target="_blank" className="md:hidden py-3">
                View Invoice
              </a>
            )}
            <p className="py-5 text-rose-500">{Error !== "" ? Error : null}</p>
          </div>
        </object>

        {/* <iframe src={`https://docs.google.com/viewer?url=${URL}&embedded=true`} ></iframe> */}
      </div>
    </div>
  );
}

export default ViewInvoice;
