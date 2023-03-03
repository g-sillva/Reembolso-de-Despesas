import React, { useState } from 'react';
import CardEditarLancamento from "../card_cadastro_lancamento/CardEditarLancamento";


import "./CardLancamento.css";

function CardLancamento({ valor = "0", 
                          status = "EM RASCUNHO", 
                          data, 
                          titulo = "-", 
                          descricao = "-", 
                          categoria, 
                          comprovativo, 
                          aoAbrirEdicao }) {

  const [isImagemOpen, setIsImagemOpen] = useState(false);

  valor /= 100;
  return (
    <div className='card-lancamento'>
      {isImagemOpen && (
        <>
          <div className='card-lancamento-preview-bg' onClick={() => setIsImagemOpen(false)}></div>
          <div className='card-lancamento-preview-img-container'>
            <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA8QDxANDw8PEA0ODw0PDQ8NDQ0PFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQFSsdFR0rKysrKy0rKy0tLSsrKy0rKysrLS0rLTctLTcrNzc3LS0rLSsrKy0tKysrKysrKysrK//AABEIARgAtAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAYFB//EADQQAAIBAgUDAwEGBQUAAAAAAAABAgMRBAUSITEGQVETYXGBFCIjMpGxM0JSYnIHJIKhwf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAQEBAQACAgIDAQAAAAAAAAABAhEDIQQxEjIFE0FR/9oADAMBAAIRAxEAPwDfRkTJlZhOZnkJ2yKchlJjofSCk33JYRsOmBOfgOhKQ14bESxm9miWdS/AdCCnJq5Zo177WKTozcrp2XgtUabXIBNUvbZldxn5LFh0hhBSU092WkwLDhwcGRyop+AXOXYb74hwToL2GdEa817gurPwFLhp0yrUwyfJZ1NisEPiGnhkiXQO2BrYuAFVbiBqvf6CEDzkHBgyiFBCwpKghkOaJMxkEMkAN6S5sGojoJAA6GGoMbWLWIHGbGuDJDCRB2I4BJiArDg6hKQARHUJAZjNWSCSHSCF9BFIGwcgRhVrc/QQVfn6CDgSRQSQSArSaV0RJwJUOUKeJbLUJlcCaw3pvyBKZz8xzP0ot337ATo1JKH5pJfLIlj6S/nj+pgcyzapUb+9IownL+qX6sVoerQjGSummTKgvJ5xl2b1aTS1O3ybbB4l1EpJ7NBKHR9JeRnBEak/I+pj6BaB9CAuK7AD9MZxSEpjTdxA+pCZVlSl2YKjLyPnTTTml3HjNMhcfI6QcNJIiYVwWH2Fau9/oIest/oICW7BRiDcdSGQZUF2Q2mxLcaQjQVeDC9Q4xSqab7I2+Lf3X8M8kzuq/Wab2Te4qTT4GnTkldJnbo4Ki1+VGQyXFQXMkd+GaU1tqRhvXFzJsflcVdw/Q6vTFV2cH24K3rKSundMtZFG05BNn+DQjjJjm0qKQhCKILGTCYNhmdgSQUhkKBGIKQLAzCFcG4uhFW5+ggaz3+gigtCuJU35C9ISQ+ql3QEsRHyh5YKL5uMsHFcDCviqi0yfszyDqSX4s/k9fx9FuEkubM8iz3DtVJ6rp3fYnRxy8BqdSKu93Y0ea5RUp01Ui32djiZVUjCacuzTN1DNqNSCi97WOXV9tss5kma109LTsb3I6jvucfAVMOntFJ+TR4Chq3QoquvTdw2gKNOwU4tnThjoUWPcCNMWgvqRtjA6RNB9A7BbEDJjAJzsROumStXA9JEgKYSYtIgNFVW/wBBCq8/QRRrqkA5u49xNCQliwiJSBdWwAUkecdd4K09UVszfLE78FDqHD0p0Za9KdnZt2YtKjxGpUs38lnBYuUHfn2Fj6CjOS2e/KFg6Ckcmvttl2csxrnUXbg9WyaFqcfLSPJcBT0TTPTMozC8IqzXCFF2NAOmV1UHhUOrLn19pxDagXMtIxpAObBc2FB2QykE6g+wwBMTY7sCxcMhhDMQR1ORCaEUawmFcjuEmQzOM4jlXG4uNOLbfAQwZji4UYOcmlZHkPU/UdSvUahOSgtrLgudZ9RTqycIu0d1yY5SC/SosKo+7uWMPiXEoklKLbscu22Wv6di6s1tt3N1TSjZHC6QwOimpPl+x3qzRli+20np3cFaSTLek4WAzBQ2aujuUMTGavFo9DH05/JDtAuBLqBkyoyRiYLGEDWE0OIQD6aBaJCOQCGGHEIwWEOxB0ziUji13Ui+XYkpVpPux9ZupVqWRiOp8ze6vt4NJjJuNOTv2Z5bnmOu5b92HDcLM6uqTZRiwq87sii9yavMdClG51skwDqVFttdHNy+Op2uegdLYDStTXwzn8n01y0uCoKEIrjY5OY5rCm2tS2LuZ43TBrwjzHMq851Jbu7ZjHRltsLnevhbeTv5PmVpLfnkxGUUtNNX5sTLM3CW3ZnZi8XrEsesqqnugJTOD05mXrQ90ds1cO88PcVxhB1me4EpDtkchUHcwdY1h1EOgtQnIWkZoAZyGExD9GixNK6IcFQtyXpxI4RsKpcfqqrpw9S3hniOKrtylv3Z7F11K2Hn8Hi1R7v5YuqyjchXGHE1kXMNGXK/wCjadJ42olaUm14ZjsBI62Gx3p2s+DPWY0jZ4uq5soyyyEpKTW5UwWbqTSfJdqY5R3MbHRiLVbDqMNttjJ4mvadvc7ONzeOhox9TEXnf3OjKq9Q6Jnv8m2R590TW/L8I9Bi9i3L5T3GbGuC2NzCbBbBbBlK3IiSIIjjILUMHAmFqXkGQdCNiGYg4aaUiNsOEPJJoQqmMB/qLiGqLV+WeUTPT/8AU3aC+Ty9piXAjo7NXputGj67/La/hnGiJrFui7IWpjU+Bu5Ni46GX3co/KO/mVB6L+EcTKY3nE1iSlBxe+zMPJ6dXijIJuW1/YDF5TVhFVGnpdt7FiFO1bTx949CzLBRlgGrbqN18m2fobjLdIY5xklfg9YwlTVFPyjyDo3AOVS74TPV8G7RS8Kxcrl8i22NceI9huagbYNWlq5JmM2Mlb0bd2P6PuyUaTsIAhTt3ZI2MmK4zBNiGkxgC5cZzA1Ayew76Sx3WWDVd6XwY19MJNPVtdG6zx3kcqZNqo62JwUZ4L09tqZ43Vo6Zyj4bR7Tgad8PO7/AJWeR5nC1aov7mLrWK8FsD3J5LYgfIutY7/T1O8jtxr6amnszj9LRbnZbss52pU56t1uc3ldXhRZxR0VYzXDaPQ8B+Lg/wDgzF1oqvRTXKRt+ll/trf2tG2Neh5Wa6ahoqSj7m1w8rmPwNPRiJp+f/TV4J7ld9uPbqxWw5Gp7A+tLwW5xzkUI4uprtKP3ezLlwJRGQlUIatW/wB0MWlc23EEcIyRJrDZDKFwM05CAdNe4h8V1cg7jz4Y3wJhazZbOPzfqcqR3M+Sjduy9zPfaqbko6k2zPSo0+CX+2l/izyLNV+PP5Z7PhaVsO15i/2PHc5javP5JbZU5ld8lmaKz5DreO309mCoVFJq6NPnVSliaeun9V3MPRjsdbIcZolpl+WWxnqda4vF3p+taUqb4fFza9P1NGqPK5RhMbRdGqpL8rd0zUdOYzXNK/KCK37i5jKVq7l5dzt5e7lDM4/eiX8s4QS+3Ht0kh7CInUOnrmGwWDrG1ABCAcgdYgmGI9YtYApiAkxB2qXattUrNyV3aT5avy/cEaLCKtQzPV+GcqUn43MnlOV6tM3e6fB6JnGH10prymZrJlZaf6WZ6XGlw/8L/ieQZ/D8efyz2CL+6/h/seSdQ/x5/Mv3JjXP25NTgqJblmq9iCnyJ0LkINIGE7M62XU1ONmBjMskneKv7BV5XcNiFiKapye64fcWUVp4XERUr6W7J9jl0sJWi7qLOhOrXklF0291vbcirv09BxFqijNcNF7LjPZNVn6SU4tfJ3svqE/649uoyNxDUhXOiXsc6KUSP0n5J5yQykMkHpD6Ca4LYjCkPpFEcYQS5ENUluIppFyARE2MpAxHX3i/hmRwf8AEn8/+mtbun8MxNbFKnXkntdmW77XlqYP7v0f7HlHUT/Gn8v9z0zCYnXH6HnvVODlCrJvhsz/ACbZZmvIijMmxUSpwaSdbddjLsfofsd2jnq7QuY2Ezv5WlK1rL3Y+VpjTRUMbVqcU0l5Z08BHf77Rz8HTaSvO68LYtTqWJ3i/ir+zP8A11ptLgsZe9zk4Ko5bGgwdJJHJi677c/ks/xaUxa2EkhWR2xy0Dkx4yC2Guh9InUG1iBYqZ3UBdUZgk9oR1ZbiGm9xGn5U1/UNcEjqVEuR1mm1GB6uoONWMlfd8myp4xN2s/k5fVWE10rrtuZbXFPIqto89jkdWYqM1a26/UrZRjnGWlv2+hc6hwKdN1I+DCxtmsBiZ3ZUlIOvLdkNzs8efSbpJGZboYxx4exXwVNTqRi+JOx1M8yj0LNX0tdy5kf2ektLOJL+Z/qWaefvzczDQUFubWS545s2zXXrXSMvVjqfyauMbGF6BqNRsbdNnHrw8rb+zqW41wLjNil4ODuK5C5sjlX3Ss9/wDofRxauC2RXIpXuSOLFxrkabAqS2F0FVluOUZt3EV0nZI69O6JAWzSoVVRsSThqi4vhqwcmBNN8OxFV1ic06aqqrqpWtyW8Th6qwsozjuk/wBjVWfd3K+MheEl5TI4uV4diFu/lldnSzahprTXuwIYG6vc6sM93iHLn+LT/wAkegdW4bVhlK3CW/0MLg6Fq1P/ACR6nnlFSwiX9q/Yu+k5vXkLJcPTcpJIHFQ0ya92Wso/PF2NMe0eTXI3XST9OUYvwbiFQxORU9U078GupSJ+TJmRl8bd1aujMjUxpVDgruECyJ1BpVSQmHKUq7G+0MV0a5Iik+Sv9oYvWJ6ATEKTGNJfSeOyU8ZVa4J5zK1bc2tZlh6jfLJ7lKKsTKZndGmbIqjvdA6mBKYum8w6wwmiu32kUsFGVvY2fWeB9SnrXMTH4KD/AKuOx1+Bl5f1Jw01ab/uR6NmU74Zf4r9jznH7OL8NG3w1f1MNG/9Jp5/TPw3sebY788vll/KqfcgzCl+K/k6+XUdl9C/jz8rxHyNczWj6d2f6Gk17mdymFu52VIX8lPxkjL+P99q6pj6isqgvVPImnq8TahOZXnWK1TEhNDi5KYDmc6WLKtbMJEXQ47DqEM8Ul3OI8TJ9wdE5cbh+SnYeZREcqOBqeH+jEVyhsqtQryriEbW1igliLDfa2IRlaZnimRSryEIU1ehSzOo5Upp8WZ5/TVpbPuIR3fH1WPl+hY2Ltc0vT9RujvxYQjq+RPUY+H6ZrMX+K/k6WArKy3EIv4X7M/lfq7OFqtcFp15eRxEfy37Qfxs9VLCswvVY4jxa9YvUZFOYhEdCGQ32dvsIQUCWFa3sdTIJwlU0PdppCEPIbhZZDwIQjrkJ//Z'/>
            <i className="fa-solid fa-xmark card-lancamento-preview-img-button"></i>
          </div>
        </>
      )}
      <div className='card-lancamento-top-container'>
        <div className='card-lancamento-textos-container'>
          <h4 className='card-lancamento-texto-titulo'>{titulo}</h4>
          <p className='card-lancamento-texto-descricao'>{descricao}</p>
          <p className='card-lancamento-texto-categoria'>{categoria.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-icones-container'>
          <i className="fa-solid fa-pen" onClick={aoAbrirEdicao}></i>
          <i className="fa-regular fa-image" onClick={() => setIsImagemOpen(true)}></i>
        </div>
      </div>
      <div className='card-lancamento-bottom-container'>
        <div className='card-lancamento-bottom-status-container'>
          <div className='card-lancamento-bottom-status-bar'>
            <div className='card-lancamento-bottom-status-bar-full'></div>
            <div className='card-lancamento-bottom-status-bar-current'></div>
            <p>%</p>
          </div>
          <p className='card-lancamento-bottom-status-text'>{status.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-bottom-text-container'>
          <p className='card-lancamento-bottom-text-date'><span>JAV</span> 2023</p>
          <h5>R${valor}</h5>
        </div>
      </div>
    </div>
  )
}

export default CardLancamento